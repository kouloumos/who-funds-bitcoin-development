import React, { useEffect, useState } from "react";
import * as d3 from "d3";

import { useCalculateFunding, useSelectEntity, useWindowSize } from "src/hooks";
import { Modal } from "src/components";

import { Footer, Navbar, SelectionDetails } from "./components";
import { drag, zoomToElement, zoomTransform } from "./graphUtils";
import { configureImage, normalize } from "./utils";
import { PageWrapper } from "./HomePage.style";
import "./graph.css";

const NODE_MIN_SIZE = 15;
const NODE_MAX_SIZE = 50;

export interface NodeData extends d3.SimulationNodeDatum {
  name: string;
  twitter: string;
  github: string;
  website?: string;
  description: string;
  avatar: string;
  missingData?: boolean;
}

export interface FundingType {
  isEmployee?: boolean; // differentiate between grantees, employees
  amount?: number; // grants might have amount
  btc?: number; // grant is in btc
  details?: string | string[]; // funding details
  year?: number | number[]; // [start] | [start, end]
  src?: string; // link to announcement
}

export interface LinkData extends FundingType {
  source: NodeData; // funding source
  target: NodeData; // funding target
}

export interface FundingRecordType extends FundingType {
  entity: NodeData;
}

export type EntityType = {
  entity: NodeData;
  grantees: FundingRecordType[]; // who this entity funds
  funders: FundingRecordType[]; // funding source of this entity
};

const FundsGraphPage = () => {
  const [openIntroModal, setOpenIntroModal] = useState(true);
  const [initialTransform, setInitialTransform] = useState<d3.ZoomTransform>();
  const [graphLoading, setGraphLoading] = useState(true);
  const svgRef = React.useRef(null);
  const [width, height] = useWindowSize();
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedEntity, setSelectedEntity] = useState<EntityType>();
  const [
    maxConnections,
    entities,
    funding,
    entityGranteesNames,
    entityFundersNames,
  ] = useCalculateFunding(selectedYear);
  const [selectEntity, deselectEverything] = useSelectEntity({
    entityGranteesNames,
    entityFundersNames,
    setSelectedEntity,
    selectedYear,
    initialTransform,
  });

  // scale circles size based on number of outbound connections
  const scaleSize = d3
    .scalePow()
    // .exponent(1 / 3)
    .domain([0, maxConnections])
    .range([NODE_MIN_SIZE, NODE_MAX_SIZE]);

  const handleYearSelection = (newSelection: number) => {
    setSelectedYear(newSelection);
  };

  /**
   * Rendering of the graph occurs here and re-renders only on window resize
   * or change of year selection.
   */
  useEffect(() => {
    var svg = d3.select(svgRef.current);

    // reset graph
    setGraphLoading(true);
    svg.selectChildren().remove();
    setSelectedEntity(undefined);

    // Construct the forces
    const forceNode = d3.forceManyBody().strength(-30);
    const forceLink = d3
      .forceLink(funding)
      //@ts-ignore
      .id((d) => d.name);
    // distance of links is set by nodes' forceCollide
    // .distance(70);

    var simulation = d3
      .forceSimulation(entities)
      .force("link", forceLink)

      .force("charge", forceNode)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force(
        "collide",
        d3.forceCollide(
          (d) => scaleSize(entityGranteesNames[d.name].length) + NODE_MIN_SIZE
        )
      )
      .on("tick", ticked);

    // add the zoom layer on which the rest of the elements are created
    // this <g/> element is then transform in the zoom logic which is
    // implemented in the 'selectEntity' function of the 'useSelectEntity' hook
    const zoomLayer = svg.append("g").attr("id", "zoomLayer");

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // define thumbnails
    svg
      .selectAll("defs")
      .data(entities)
      .enter()
      .append("defs")
      .append("pattern")
      .attr("id", function (d) {
        return `image${normalize(d.name)}`;
      })
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("patternContentUnits", "objectBoundingBox")
      .append("svg:image")
      .attr("xlink:href", (d) => configureImage(d))
      .attr("width", 1)
      .attr("height", 1);

    // create links between entities
    var link = zoomLayer
      .append("g")
      .selectAll("line")
      .data(funding)
      .enter()
      .append("line")
      .attr("stroke", "grey")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", function (d) {
        return 3;
      })
      .attr(
        "id",
        (d) => `line-${normalize(d.source.name)}-${normalize(d.target.name)}`
      );

    function ticked() {
      link
        //@ts-ignore
        .attr("x1", (d) => d.source.x)
        //@ts-ignore
        .attr("y1", (d) => d.source.y)
        //@ts-ignore
        .attr("x2", (d) => d.target.x)
        //@ts-ignore
        .attr("y2", (d) => d.target.y);
      //@ts-ignore
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    // create entities
    var node = zoomLayer
      .append("g")
      .selectAll("circle")
      .data(entities)
      .enter()
      .append("circle")
      .attr("r", (d) => scaleSize(entityGranteesNames[d.name].length))
      .attr("fill", function (d) {
        return `url(#image${normalize(d.name)})`;
      })
      .attr("id", (d) => `circle-${normalize(d.name)}`)
      .on("click", selectEntity)
      //@ts-ignore
      .call(drag(simulation));

    setTimeout(() => {
      setGraphLoading(false);
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, width, height]);

  /**
   * When graph is rendered, apply zoom to fit-to-screen
   */
  useEffect(() => {
    var svg = d3.select(svgRef.current);
    // between year filtering (graph rerenders) there is already a calculated
    // fit-to-screen transformation that we apply for smoother transition
    if (initialTransform) {
      svg
        .transition()
        .duration(750)
        //@ts-ignore
        .call(zoomToElement.transform, initialTransform);
    }
    // when graph is ready, zoom to fit to screen
    if (!graphLoading) {
      const node = d3
        .select("#zoomLayer")
        .selectAll("circle") as unknown as d3.Selection<
        SVGCircleElement,
        NodeData,
        SVGGElement,
        unknown
      >;
      const transform = zoomTransform(node);
      if (transform) {
        setInitialTransform(transform);
        svg
          .transition()
          .duration(750)
          //@ts-ignore
          .call(zoomToElement.transform, transform);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphLoading]);

  // intro modal opens only on user's first visit
  useEffect(() => {
    const firstVisit = localStorage.getItem("visit") === null;
    if (!firstVisit) setOpenIntroModal(false);
  }, []);

  const handleModalClose = () => {
    localStorage.setItem("visit", "true");
    setOpenIntroModal(false);
  };

  return (
    <PageWrapper>
      <Modal type="intro" open={openIntroModal} onClose={handleModalClose} />
      <Navbar
        selectedYear={selectedYear}
        onYearSelection={handleYearSelection}
      />

      {selectedEntity && (
        <SelectionDetails
          key={selectedEntity.entity.name}
          selectedEntity={selectedEntity}
          onSelectionClose={deselectEverything}
          onEntitySelection={selectEntity}
        />
      )}

      <svg ref={svgRef} id="svg" width={width} height={height} />
      <Footer entities={entities} onEntitySelection={selectEntity} />
    </PageWrapper>
  );
};

export default FundsGraphPage;
