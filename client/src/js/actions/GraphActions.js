var Reflux = require('reflux');

var GraphActions = Reflux.createActions([
  'addNode',
  'editNode',
  'updateNode',
  'loadNodes'
]);


module.exports = GraphActions;