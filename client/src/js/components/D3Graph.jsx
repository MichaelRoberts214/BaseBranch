var d3 = require('d3');
var React = require('react');
var GraphStore = require('../stores/GraphStore.jsx');
var NodeResourceActions = require('../actions/NodeResourceActions.js');

var ANIMATION_DURATION = 400;
var TOOLTIP_WIDTH = 30;
var TOOLTIP_HEIGHT = 30;


// d3.selection.prototype.moveToFront = function() {
//   return this.each(function(){
//     this.parentNode.appendChild(this);
//   });
// };  


var ns = {};

ns.create = function(el, props, state) {
  // var svg = d3.select(el).append('svg')
  //     .attr('class', 'd3')
  //     .attr('width', GraphStore.width)
  //     .attr('height', GraphStore.height)
  //     .attr('style', 'background: AliceBlue');

  // svg.append('g')
  //     .attr('class', 'd3-points');

  // svg.append('g')
  //     .attr('class', 'd3-texts');

  // //var dispatcher = new EventEmitter();
  // this.update(el, state, null);

  return; //dispatcher;
};

ns.update = function(el, state) {
  var scales = this._scales(el, state.domain);
  var prevScales = this._scales(el, state.prevDomain);
  this._drawPoints(el, scales, state.data, prevScales);
};

ns._scales = function(el, domain) {
  if (!domain) {
    return null;
  }
  // console.log('offSetWidth', el.offsetWidth);
  // console.log('offSetHeight', el.offsetHeight);

  var width = el.offsetWidth;
  var height = el.offsetHeight;

  var x = d3.scale.linear()
    .range([0, width])
    .domain(domain.x)
    .clamp([true]);

  var y = d3.scale.linear()
    .range([0, height])
    .domain(domain.y)
    .clamp([true]);

  var z = d3.scale.linear()
    .range([5, 20])
    .domain([1, 10]);

  return {x: x, y: y, z: z};
};

ns._drawPoints = function(el, scales, data, prevScales) {

  this.destroy(el);

  // var g = d3.select(el).selectAll('.d3-points');

  // var gt = d3.select(el).selectAll('.d3-texts');

  // var point = g.selectAll('.d3-point')
  //   .data(data, function(d) { return d.id; });

  // var text = gt.selectAll('.d3-text')
  //   .data(data, function(d) { return d.id; });



  // var force = d3.layout.force()
  //   .size([GraphStore.width, GraphStore.height])
  //   //.nodes(data)
  //   .charge(0)
  //   .gravity(0)
  //   .start();



  // // Draw the circle into the canvas
  // point.enter().append('circle')
  //   .attr('class', 'd3-point')
  //   .attr('stroke', 'CornflowerBlue')
  //   .attr('fill', 'SkyBlue')
  //   .attr('cx', function(d) {
  //     if (prevScales) {
  //       return prevScales.x(d.x);
  //     }
  //     return scales.x(d.x);
  //   })
  //   .transition()
  //     .duration(ANIMATION_DURATION)
  //     .attr('cx', function(d) { return scales.x(d.x); });

  // point.attr('cy', function(d) { return scales.y(d.y); })
  //     .attr('r', function(d) { return scales.z(d.z); })
  //     .on('mouseover', function(d) {
  //       //
  //     })
  //     .on('mouseout', function(d) {
  //       //
  //     })
  //   .transition()
  //     .duration(ANIMATION_DURATION)
  //     .attr('cx', function(d) { return scales.x(d.x); });


  // // Add text and link to circles
  // text.enter().append("text")
  //   .attr("x", function(d) { return scales.x(d.x); })
  //   .attr("y", function(d) { return scales.y(d.y); })
  //   .attr("z", 11)
  //   .attr('class', 'd3-text')
  //   .text( function (d) { return d.name; })
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "20px")
  //   .attr("fill", "black")
  //   .attr("cursor", "pointer")
  //   .attr("id", function(d) {return d.id})
  //   .on("click", function(d) {
  //     NodeResourceActions.setNodeId(d.id);
  //   });
  //   //.moveToFront();


  // force.on('tick', function(){
  //   point.attr({
  //     cx: function(d){
  //       return d.x;
  //     },
  //     cy: function(d){
  //       return d.y;
  //     }
  //   });
  // });



  // if (prevScales) {
  //   point.exit()
  //     .transition()
  //       .duration(ANIMATION_DURATION)
  //       .attr('cx', function(d) { return scales.x(d.x); })
  //       .remove();

  //   text.exit()
  //     .remove();
  // }
  // else {
  //   point.exit()
  //     .remove();

  //   text.exit()
  //     .remove();
  // }

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  var width = 960,
      height = 500,
      padding = 1.5, // separation between same-color nodes
      clusterPadding = 6, // separation between different-color nodes
      maxRadius = 12;


  // console.log('length',GraphStore.nodeData.length);
  // GraphStore.nodeData.length returns 0 here
  var n = 4,//GraphStore.nodeData.length, // total number of nodes
      m = 1; // number of distinct clusters

  var color = d3.scale.category20c()
      .domain(d3.range(m));

  // The largest node for each cluster.
  var clusters = new Array(m);

  var nodes = d3.range(n).map(function() {
    var i = Math.floor(Math.random() * m), // cluster number
        r = 20,//Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
        d = {cluster: i, radius: r/*, id: data*/};
    if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
    return d;
  });

  // put data into nodes
  // console.log('data from d3', data);
  // console.log('nodes', nodes);
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].id = data[i].id;
    nodes[i].channelId = data[i].channelId;
    nodes[i].name = data[i].name;
    nodes[i].createdAt = data[i].createdAt;
    nodes[i].updatedAt = data[i].updatedAt;
  }

  // Use d3's pack layout to initialize node positions.
  d3.layout.pack()
      .sort(null)
      .size([width, height])
      .children(function(d) { return d.values; })
      .value(function(d) { return d.radius * d.radius; })
      .nodes({values: d3.nest()
        .key(function(d) { return d.cluster; })
        .entries(nodes)});

  // Apply force to each node
  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(.02)
      .charge(0)
      .on("tick", tick)
      .start();

  // Old appended SVG
  // var svg = d3.select("body").append("svg")
  //     .attr("width", width)
  //     .attr("height", height);

  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', GraphStore.width)
      .attr('height', GraphStore.height)
      .attr('style', 'background: AliceBlue');

  svg.append('g')
      .attr('class', 'd3-points');

  svg.append('g')
      .attr('class', 'd3-texts');

  var g = d3.select(el).selectAll('.d3-points');
  var gt = d3.select(el).selectAll('.d3-texts');
  // var point = g.selectAll('.d3-point')
  //   .data(data, function(d) { return d.id; });
  var text = gt.selectAll('.d3-text');
    //.data(data, function(d) { return d.id; });

  // var nodeEnter = node.enter().append("g")
  //   .attr("class", "node")
  //   .on("click", click)
  //   .call(force.drag);

  // nodeEnter.append("circle")
  //   .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; });

  // nodeEnter.append("text")
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d.name; });

  var node = g.selectAll(".d3-points") // changed from "circle"
      .data(nodes)
      // .data(data, function(d) { return d.id; })
      .enter().append("circle")
      .style("fill", function(d) { return color(d.cluster); }) // can just set the color here
      .call(force.drag);

  // Add text and link to circles
  //text.enter().append("text")
  //node.enter()

  var texts = //g.selectAll(".d3-points")
    text
    .data(nodes)
    //.data(data, function(d) { return d.id; })
    .enter()
    .append("text")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("z", 11)
    .attr('class', 'd3-text')
    .text( function (d) { return d.name; })
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .attr("cursor", "pointer")
    .attr("id", function(d) {return d.id})
    .on("click", function(d) {
      NodeResourceActions.setNodeId(d.id);
    })
    .call(force.drag);

  node.transition()
      .duration(750)
      .delay(function(d, i) { return i * 5; })
      .attrTween("r", function(d) {
        var i = d3.interpolate(0, d.radius);
        return function(t) { return d.radius = i(t); };
      });

  texts.transition()
      .duration(750)
      .delay(function(d, i) { return i * 5; });


  function tick(e) {
    node
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    texts
        .each(cluster(10 * e.alpha * e.alpha))
        .each(collide(.5))
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
  }

  // Move d to be adjacent to the cluster node.
  function cluster(alpha) {
    return function(d) {
      var cluster = clusters[d.cluster];
      if (cluster === d) return;
      var x = d.x - cluster.x,
          y = d.y - cluster.y,
          l = Math.sqrt(x * x + y * y),
          r = d.radius + cluster.radius;
      if (l != r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    };
  }

  // Resolves collisions between d and all other circles.
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }





};

ns.destroy = function(el) {
  d3.select(el).selectAll(".d3-point").remove();
  d3.select(el).selectAll(".d3-texts").remove();
  d3.select(el).selectAll("g").remove();
  d3.select(el).selectAll("svg").remove();
};

module.exports = ns;
