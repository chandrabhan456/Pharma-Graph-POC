import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const nodes = [
  { id: "P002" },
  { id: "Rvr-lindi" },
  { id: "Digoxin" },
  { id: "Losartan" },
  { id: "Methotrexate" },
  { id: "Renali domis" },
  { id: "Neoplasmia" },
  { id: "Deep vein thrombosis" },
  { id: "Bleeding" },
  { id: "Heart" }
];

const links = [
  { source: "P002", target: "Rvr-lindi", label: "PRESCRIBED\n6.3" },
  { source: "P002", target: "Digoxin", label: "Existing Dr." },
  { source: "P002", target: "Losartan", label: "Existing Dr." },
  { source: "P002", target: "Methotrexate", label: "Existing Dr." },
  { source: "Rvr-lindi", target: "Renali domis", label: "contains" },
  { source: "Renali domis", target: "Neoplasmia", label: "7" },
  { source: "Renali domis", target: "Deep vein thrombosis", label: "28" },
  { source: "Deep vein thrombosis", target: "Bleeding", label: "28.6" },
  { source: "Bleeding", target: "Heart", label: "L6" },
  { source: "Digoxin", target: "Heart", label: "6" },
  { source: "Losartan", target: "Heart", label: "5" },
  { source: "Methotrexate", target: "Heart", label: "6" },
];

const linkColor = d3.scaleOrdinal(d3.schemeCategory10);
const NODE_RADIUS = 45;

export default function D3DirectedGraph() {
  const ref = useRef();

  useEffect(() => {
    const width = 800;
    const height = 800;

    d3.select(ref.current).selectAll("*").remove();

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height);

    // Add a group that will be zoomed & panned
    const g = svg.append("g");

    // Add zoom behavior
    svg.call(
      d3.zoom()
        .scaleExtent([0.2, 3])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        })
    );

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(180))
      .force("charge", d3.forceManyBody().strength(-900))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(NODE_RADIUS + 8)); // prevent overlap

    // Draw links (no arrow)
    const link = g.append("g")
      .selectAll("path")
      .data(links)
      .enter().append("path")
      .attr("stroke", (d, i) => linkColor(i))
      .attr("stroke-width", 4)
      .attr("fill", "none");

    // Labels
    const linkLabel = g.append("g")
      .selectAll("text")
      .data(links)
      .enter().append("text")
      .attr("font-size", 14)
      .attr("fill", "#444")
      .attr("text-anchor", "middle")
      .selectAll("tspan")
      .data(d => d.label.split('\n').map(line => ({ ...d, line })))
      .enter().append("tspan")
      .attr("x", 0)
      .attr("dy", (d, i) => i * 16)
      .text(d => d.line);

    // Big, light blue nodes
    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", NODE_RADIUS)
      .attr("fill", "#b3d8fd")
      .attr("stroke", "#7d7d7d")
      .attr("stroke-width", 3);

    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("font-size", 14)
      .attr("font-weight", "bold")
      .text(d => d.id);

    simulation.on("tick", () => {
      link.attr("d", d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });

      // For multi-line edge labels, you may want to adjust position further.
      linkLabel
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, []);

  return (
    <svg
      ref={ref}
      style={{
      
        background: "white",
        marginTop:'-80px',
        marginLeft:'200px',
        width: "100%",
        height: "1000px",
        margin: "20px auto",
        display: "block",
        overflow: 'scroll'
      }}
    />
  );
}
