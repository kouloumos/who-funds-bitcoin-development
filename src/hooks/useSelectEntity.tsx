import * as d3 from "d3";
import { useEffect } from "react";

import { zoomToElement } from "src/pages/HomePage/graphUtils";
import {
  EntityType,
  FundingRecordType,
  LinkData,
  NodeData,
} from "src/pages/HomePage/HomePage";
import { normalize } from "src/pages/HomePage/utils";
import { trackEvent } from "src/utils/umami";

export type SelectEntitySource = "graph" | "search" | "record";

export type Props = {
  entityGranteesNames: {
    [entityName: string]: string[];
  };
  entityFundersNames: {
    [entityName: string]: string[];
  };
  setSelectedEntity: React.Dispatch<
    React.SetStateAction<EntityType | undefined>
  >;
  selectedYear: number;
  initialTransform?: d3.ZoomTransform;
};

const useSelectEntity = ({
  entityGranteesNames,
  entityFundersNames,
  setSelectedEntity,
  selectedYear,
  initialTransform,
}: Props) => {
  const deselectEverything = () => {
    d3.selectAll("line").classed("active", false);
    d3.selectAll("circle").classed("active", false);
    d3.selectAll("line").transition(); // stop all animations
    setSelectedEntity(undefined);

    if (initialTransform) {
      // reset zoom to fit-to-screen (initial transformation) state
      const svg = d3.select("#svg");
      svg
        .transition()
        .duration(750)
        //@ts-ignore
        .call(zoomToElement.transform, initialTransform);
    }
  };

  useEffect(() => {
    const svg = d3.select("#svg");
    //@ts-ignore
    svg.call(zoomToElement);
    svg.on("click", reset); // reset when user clicks on background

    // helper function to reset the visualization
    function reset() {
      if (initialTransform) {
        deselectEverything();
      }
      // svg
      //   .transition()
      //   .duration(750)
      //   .call(
      //     //@ts-ignore
      //     zoomToElement.transform,
      //     d3.zoomIdentity,
      //     //@ts-ignore
      //     d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      //   );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, initialTransform]);

  const selectEntity = (
    event: any,
    entity: NodeData,
    source: SelectEntitySource = "graph"
  ) => {
    // helper function to animate line
    function animateLine(id: string) {
      d3.selectAll(id)
        .attr("stroke-dashoffset", 100)
        .transition() // Call Transition Method
        .duration(4000) // Set Duration timing (ms)
        .ease(d3.easeLinear) // Set Easing option
        .attr("stroke-dashoffset", 0) // Set final value of dash-offset for transition
        .on("end", function () {
          animateLine(id);
        });
    }
    // helper function to calculate max distance neighbour
    const distanceFromSelectedEntity = (
      node: NodeData,
      maxDistance: { x: number; y: number }
    ) => {
      //@ts-ignore
      const distanceX = Math.abs(entity.x - node.x);
      //@ts-ignore
      const distanceY = Math.abs(entity.y - node.y);
      if (distanceX > maxDistance.x) maxDistance.x = distanceX;
      if (distanceY > maxDistance.y) maxDistance.y = distanceY;
    };
    trackEvent(entity.name, `select-entity-${source}`);

    if (event) event.stopPropagation();

    deselectEverything();

    // highlight entity
    var entityGrantees: FundingRecordType[] = [];
    var entityFunders: FundingRecordType[] = [];
    var maxDistance = { x: 100, y: 100 };

    const entityName = entity.name;
    const entityId = `#circle-${normalize(entityName)}`;
    const isActive = d3.selectAll(entityId).classed("active");

    //extract node's id and ids of its neighbors
    var funders = entityFundersNames[entityName],
      grantees = entityGranteesNames[entityName];

    // highlight entity's funders
    for (var funderIndex = 0; funderIndex < funders.length; funderIndex++) {
      const lineId = `#line-${normalize(funders[funderIndex])}-${normalize(entityName)}`;
      d3.selectAll(lineId).classed("active", !isActive); // toggle line's active status
      const grantData = d3.selectAll(lineId).data() as LinkData[];
      var funderOccurrences = 0;
      if (grantData.length > 1) {
        // multiple funding records for the same entity
        // count previous occurrences
        funderOccurrences = entityFunders.filter(
          // eslint-disable-next-line no-loop-func
          (funder) => funder.entity.name === funders[funderIndex]
        ).length;
      }
      entityFunders.push({
        amount: grantData[funderOccurrences].amount,
        btc: grantData[funderOccurrences].btc,
        details: grantData[funderOccurrences].details,
        src: grantData[funderOccurrences].src,
        year: grantData[funderOccurrences].year,
        entity: grantData[funderOccurrences].source,
      });

      distanceFromSelectedEntity(
        grantData[funderOccurrences].source,
        maxDistance
      );
      animateLine(lineId);
    }
    // highlight entity's grantees
    for (var granteeIndex = 0; granteeIndex < grantees.length; granteeIndex++) {
      const lineId = `#line-${normalize(entityName)}-${normalize(grantees[granteeIndex])}`;
      d3.selectAll(lineId).classed("active", !isActive); // toggle line's active status
      const grantData = d3.selectAll(lineId).data() as LinkData[];
      var granteeOccurrences = 0;
      if (grantData.length > 1) {
        // multiple funding records for the same entity
        // count previous occurrences
        granteeOccurrences = entityGrantees.filter(
          // eslint-disable-next-line no-loop-func
          (grantee) => grantee.entity.name === grantees[granteeIndex]
        ).length;
      }
      entityGrantees.push({
        isEmployee: grantData[granteeOccurrences].isEmployee,
        amount: grantData[granteeOccurrences].amount,
        btc: grantData[granteeOccurrences].btc,
        details: grantData[granteeOccurrences].details,
        src: grantData[granteeOccurrences].src,
        year: grantData[granteeOccurrences].year,
        entity: grantData[granteeOccurrences].target,
      });

      distanceFromSelectedEntity(
        grantData[granteeOccurrences].target,
        maxDistance
      );

      animateLine(lineId);
    }

    // zoom to entity
    const [[x0, y0], [x1, y1]] = [
      //@ts-ignore
      [entity.x - maxDistance.x, entity.y - maxDistance.y],
      //@ts-ignore
      [entity.x + maxDistance.y, entity.y + maxDistance.x],
    ];
    const svg = d3.select("#svg");
    const width = svg.attr("width") as unknown as number;
    const height = svg.attr("height") as unknown as number;
    svg
      .transition()
      .duration(750)
      .call(
        //@ts-ignore
        zoomToElement.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(3, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
      );

    // toggle entity's active status
    d3.selectAll(entityId).classed("active", !isActive);
    // update selection
    setSelectedEntity({
      entity,
      grantees: entityGrantees,
      funders: entityFunders,
    });
  };
  return [selectEntity, deselectEverything] as const;
};

export default useSelectEntity;
