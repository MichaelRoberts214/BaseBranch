var mui = require('material-ui');
var React = require('react');
var GraphStore = require('../stores/GraphStore.jsx');
var d3 = require('d3');

var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

var GraphView = React.createClass({

    



  render: function() {
    var nodeCircles = GraphStore.circleProperties.map(function(result) {
      return <g key={result.id}>
          <circle cx={result.nodeCoordinates.x} cy={result.nodeCoordinates.y} r={result.nodeCoordinates.r} stroke="CornflowerBlue" fill="AliceBlue"></circle>
          <text x={result.nodeCoordinates.x} y={result.nodeCoordinates.y} fontFamily="sans-serif" fontSize="10px" fill="black" textAnchor="middle">{result.channelName}</text>
        </g>
      });

    return (
      <div className="left">
        <svg width={GraphStore.width} height={GraphStore.height} fill="Azure" xmlns="http://www.w3.org/2000/svg" >
          {nodeCircles}
        </svg>
      </div>
    );
  }
});

module.exports = GraphView;
