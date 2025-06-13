import React, { useEffect } from "react";
import * as d3 from "d3";

const D3Component = ({ data }) => {
  useEffect(() => {
    d3.select("#d3-container").selectAll("*").remove();

    let i = 0;
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };
    const width = 960 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;

    const svg = d3
      .select("#d3-container")
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const treeMap = d3.tree().size([height, width]);
    const root = d3.hierarchy(data, (d) => d.children);
    root.x0 = height / 2;
    root.y0 = 0;
    root.children?.forEach(collapse);

    // Arrowhead marker, one per color
    function addArrowMarker(color) {
      const markerId = `arrow-head-${color.replace(/[^a-zA-Z0-9]/g, "")}`;
      if (svg.select(`#${markerId}`).node()) return markerId;
      svg
        .append("defs")
        .append("marker")
        .attr("id", markerId)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 10)
        .attr("refY", 0)
        .attr("markerWidth", 7)
        .attr("markerHeight", 7)
        .attr("orient", "auto")
        .attr("markerUnits", "strokeWidth")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", color);
      return markerId;
    }

    function collapse(d) {
      if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
      }
    }

    function update(source) {
      const treeData = treeMap(root);
      const nodes = treeData.descendants();
      const links = treeData.descendants().slice(1);

      nodes.forEach((d) => {
        d.y = d.depth * 200;
      });

      // --- NODES ---
      const node = svg.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i));

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .on("click", click);

      // Rectangles (nodes with width)
      nodeEnter
        .filter((d) => d.data.width)
        .append("rect")
        .attr("width", (d) => d.data.width)
        .attr("height", 50)
        .attr("x", (d) => -d.data.width / 2)
        .attr("y", -25)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("fill", (d) => d.data.color || "lightsteelblue");

      // Circles (nodes with radius)
      nodeEnter
        .filter((d) => d.data.radius)
        .append("circle")
        .attr("r", (d) => d.data.radius)
        .style("fill", (d) => d.data.color || "lightsteelblue");

      // Text (centered)
      nodeEnter
        .append("text")
        .attr("dy", ".35em")
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .text((d) => d.data.name)
        .each(function (d) {
          // Only wrap for rectangles
          if (d.data.width) {
            wrapText(d3.select(this), d.data.width - 10);
          }
        });

      node
        .merge(nodeEnter)
        .transition()
        .duration(200)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      node
        .exit()
        .transition()
        .duration(200)
        .attr("transform", (d) => `translate(${source.y},${source.x})`)
        .remove();

      // --- LINKS ---
      const link = svg.selectAll("path.link").data(links, (d) => d.id);

      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", (d) => {
          const o = { x: source.x0, y: source.y0 };
          return elbow(o, o);
        })
        .style("fill", "none")
        .style("stroke-width", "3px")
        .style("stroke", (d) => d.data.color || "lightsteelblue")
        .attr("marker-end", (d) => {
          const color = d.data.color || "lightsteelblue";
          return `url(#${addArrowMarker(color)})`;
        })
        .merge(link)
        .transition()
        .duration(200)
        .attr("d", (d) => elbow(d, d.parent))
        .style("stroke", (d) => d.data.color || "lightsteelblue")
        .attr("marker-end", (d) => {
          const color = d.data.color || "lightsteelblue";
          return `url(#${addArrowMarker(color)})`;
        });

      link
        .exit()
        .transition()
        .duration(200)
        .attr("d", (d) => {
          const o = { x: source.x, y: source.y };
          return elbow(o, o);
        })
        .remove();

      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Elbow link
    function elbow(s, d) {
      return `M${s.y},${s.x}C${(s.y + d.y) / 2},${s.x} ${(s.y + d.y) / 2},${d.x} ${d.y},${d.x}`;
    }

    function click(event, d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    // Only used for rectangles!
    function wrapText(text, width) {
      text.each(function () {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.1; // ems
        const y = text.attr("y") || 0;
        const dy = parseFloat(text.attr("dy")) || 0;
        let tspan = text.text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", `${dy}em`);
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", `${++lineNumber * lineHeight + dy}em`)
              .text(word);
          }
        }
      });
    }

    update(root);
  }, [data]);

  return <div id="d3-container"></div>;
};

export default D3Component;
