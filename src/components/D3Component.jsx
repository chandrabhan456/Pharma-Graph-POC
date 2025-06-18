import React, { useEffect } from "react";
import * as d3 from "d3";

const D3Component = ({ data }) => {
  useEffect(() => {
    d3.select("#d3-container").selectAll("*").remove();

    let i = 0;
    const margin = { top: 20, right: 90, bottom: 60, left: 90 };
    const width = 960 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

    const svg = d3
      .select("#d3-container")
      .append("svg")
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Collapse node and all descendants
    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    const treeMap = d3.tree().nodeSize([80, 220]);
    const root = d3.hierarchy(data, (d) => d.children);
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse ALL children, so only root is shown
    collapse(root);

    // Arrowhead marker for links
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#888");

    function update(source) {
      const treeData = treeMap(root);
      const nodes = treeData.descendants();
      const links = treeData.links();

      // Dynamic viewBox
      let minX = d3.min(nodes, (d) => d.x - (d.data.height || 50) / 2);
      let maxX = d3.max(nodes, (d) => d.x + (d.data.height || 50) / 2);
      let minY = d3.min(nodes, (d) => d.y - (d.data.width || 120) / 2);
      let maxY = d3.max(nodes, (d) => d.y + (d.data.width || 120) / 2);

      d3.select("#d3-container svg").attr(
        "viewBox",
        [
          Math.min(minY - 100, 0),
          Math.min(minX - 60, 0),
          maxY - Math.min(minY - 100, 0) + 200,
          maxX - Math.min(minX - 60, 0) + 120,
        ].join(" ")
      );

      // --- NODES ---
      const node = svg
        .selectAll("g.node")
        .data(nodes, (d) => d.id || (d.id = ++i));

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .style("cursor", (d) => (d.children || d._children ? "pointer" : "default"))
        .on("click", click);

      nodeEnter
        .append("rect")
        .attr("width", (d) => d.data.width || 120)
        .attr("height", (d) => d.data.height || 50)
        .attr("x", (d) => -((d.data.width || 120) / 2))
        .attr("y", (d) => -((d.data.height || 50) / 2))
        .attr("rx", 8)
        .attr("ry", 8)
        .style("fill", (d) => d.data.color || "#c6e5ff")
        .attr("stroke", "#4682b4")
        .attr("stroke-width", 2);

      nodeEnter
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .style("font-size", 14)
        .each(function (d) {
          // Defensive: always use a string for name
          let text = typeof d.data.name === "string" ? d.data.name : "";
          if (!text) {
            console.warn("Node missing 'name' property:", d.data);
            text = "?";
          }
          wrapText(
            d3.select(this),
            text,
            (d.data.width || 120) - 16,
            (d.data.height || 50) - 10
          );
        });

      node
        .merge(nodeEnter)
        .transition()
        .duration(300)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      node
        .exit()
        .transition()
        .duration(300)
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .remove();

      // --- LINKS ---
      const link = svg.selectAll("path.link").data(links, (d) => d.target.id);

      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) => {
          const parentW = d.source.data.width || 120;
          const childW = d.target.data.width || 120;
          const startX = d.source.y + parentW / 2;
          const startY = d.source.x;
          const endX = d.target.y - childW / 2;
          const endY = d.target.x;
          const midX = (startX + endX) / 2;
          return `
            M${startX},${startY}
            L${midX},${startY}
            L${midX},${endY}
            L${endX},${endY}
          `;
        })
        .attr("stroke", "#888")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("marker-end", "url(#arrowhead)");

      link
        .merge(link)
        .transition()
        .duration(300)
        .attr("d", (d) => {
          const parentW = d.source.data.width || 120;
          const childW = d.target.data.width || 120;
          const startX = d.source.y + parentW / 2;
          const startY = d.source.x;
          const endX = d.target.y - childW / 2;
          const endY = d.target.x;
          const midX = (startX + endX) / 2;
          return `
            M${startX},${startY}
            L${midX},${startY}
            L${midX},${endY}
            L${endX},${endY}
          `;
        });

      link
        .exit()
        .transition()
        .duration(300)
        .remove();

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    function click(event, d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else if (d._children) {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    // Robust text wrap for rectangles
    function wrapText(textSelection, text, width, height) {
      if (!text || typeof text !== "string") {
        textSelection.text("?");
        return;
      }
      const words = text.split(/\s+/);
      let line = [];
      let lineNumber = 0;
      const lineHeight = 16; // px
      let tspan = textSelection.text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", 0);

      for (let i = 0; i < words.length; i++) {
        line.push(words[i]);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width && line.length > 1) {
          line.pop();
          tspan.text(line.join(" "));
          line = [words[i]];
          tspan = textSelection.append("tspan")
            .attr("x", 0)
            .attr("y", 0)
            .attr("dy", ++lineNumber * lineHeight);
        }



      }
      // Center vertically
      const totalTextHeight = (lineNumber + 1) * lineHeight;
      textSelection.attr("transform", `translate(0,${-totalTextHeight / 2 + lineHeight / 2})`);
    }

    update(root);
  }, [data]);

  return <div id="d3-container" style={{ width: "100%", marginTop:'0%' }}></div>;
};

export default D3Component;
