import * as d3 from "d3";

import { NodeData } from "./HomePage";

export const drag = (simulation: d3.Simulation<NodeData, undefined>) => {
  function dragstarted(event: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: any) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: any) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

export const zoomToElement = d3
  .zoom()
  .scaleExtent([0.4, 8])
  .on("zoom", ({ transform }) => {
    d3.select("#zoomLayer").attr("transform", transform);
  });

export const zoomTransform = (
  node: d3.Selection<SVGCircleElement, NodeData, SVGGElement, unknown>
) => {
  const svg = d3.select("#svg");
  const width = svg.attr("width") as unknown as number;
  const height = svg.attr("height") as unknown as number;
  // set up zoom transform:
  var xExtent = d3.extent(node.data(), function (d) {
    return d.x;
  });
  var yExtent = d3.extent(node.data(), function (d) {
    return d.y;
  });

  if (xExtent[1] === undefined || yExtent[1] === undefined) return;
  // get scales:
  var xScale = width / (xExtent[1] - xExtent[0]);
  var yScale = height / (yExtent[1] - yExtent[0]);

  // get most restrictive scale
  var minScale = Math.min(xScale, yScale);
  var transform = d3.zoomIdentity
    .translate(width / 2, height / 2)
    .scale(minScale * 0.75)
    .translate(-(xExtent[0] + xExtent[1]) / 2, -(yExtent[0] + yExtent[1]) / 2);

  return transform;
};
