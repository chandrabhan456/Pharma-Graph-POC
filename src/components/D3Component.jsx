import React, { useEffect } from 'react';
import * as d3 from 'd3';

const D3Component = ({ data }) => {
  useEffect(() => {
    // Remove any existing SVG before creating a new one
    d3.select("#d3-container").selectAll("*").remove();

    let i = 0;

    const margin = { top: 20, right: 90, bottom: 30, left: 90 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#d3-container")
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const treeMap = d3.tree().size([height, width]);

    const root = d3.hierarchy(data, d => d.children);
    root.x0 = height / 2;
    root.y0 = 0;

    root.children.forEach(collapse);

    // Calculate max width based on text
    let maxTextWidth = 0;
    const tempText = svg.append("text").style("visibility", "hidden");
    root.descendants().forEach(d => {
      tempText.text(d.data.name);
      const bbox = tempText.node().getBBox();
      if (bbox.width > maxTextWidth) {
        maxTextWidth = bbox.width;
      }
    });
    tempText.remove();

    const nodeWidth = Math.min(maxTextWidth + 20, width / 4); // Ensure width fits within max available space

    update(root);

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

      nodes.forEach(d => { d.y = d.depth * 200; });

      const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .on('click', click);

      nodeEnter.append('rect')
        .attr('width', nodeWidth)
        .attr('height', 50) // Standard height
        .attr('x', -nodeWidth / 2)
        .attr('y', -25) // Center vertically
        .attr('rx', 5)
        .attr('ry', 5)
        .style("fill", d => d.data.color || "lightsteelblue");

      nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", 0) // Center horizontally
        .attr("text-anchor", "middle") // Center horizontally
        .style("fill", "black")
        .text(d => d.data.name)
        .call(wrapText, nodeWidth - 10);

      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate.transition()
        .duration(200)
        .attr("transform", d => `translate(${d.y},${d.x})`);

      const nodeExit = node.exit().transition()
        .duration(200)
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .remove();

      nodeExit.select('text')
        .style('fill-opacity', 1e-6);

      const link = svg.selectAll('path.link')
        .data(links, d => d.id);

      const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', d => {
          const o = { x: source.x0, y: source.x0 };
          return diagonal(o, o);
        })
        .style("fill", "none")
        .style("stroke", "#ccc")
        .style("stroke-width", "2px");

      const linkUpdate = linkEnter.merge(link);

      linkUpdate.transition()
        .duration(200)
        .attr('d', d => diagonal(d, d.parent));

      const linkExit = link.exit().transition()
        .duration(200)
        .attr('d', d => {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      function diagonal(s, d) {
        return `M ${s.y} ${s.x}
                L ${d.y} ${d.x}`;
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
    }

    function wrapText(text, width) {
      text.each(function() {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.1; // ems
        const y = text.attr("y");
        const dy = parseFloat(text.attr("dy"));
        let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", `${dy}em`);

        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word);
          }
        }
      });
    }
  }, [data]); // Run effect when data changes

  return <div id="d3-container"></div>;
};

export default D3Component;
