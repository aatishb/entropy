var makeGraph1 = function(){

  var trace1 = {
    x: [0,1,2,3,4,5,6],
    y: [28, 63, 90, 100, 90, 63, 28],
    text: ['6.1% chance', '13.6% chance', '19.5% chance','21.6% chance','19.5% chance','13.6% chance','6.1% chance'],
    mode: 'markers',
    type: 'bar',
  };

  var data = [ trace1 ];

  var layout = {
    xaxis: {
      title: 'State (i.e. Number of Sheep in Top Farm)',
    },
    yaxis: {
      title: 'Number of Arrangements'
    },
    title:'Ways to Arrange Sheep Among Two Farms'
  };

  Plotly.plot('graphsheep', data, layout);

}

Plotly.d3.select(window).on('resize.one', function () {
  Plotly.deleteTraces('graphsheep', 0);
  makeGraph1();
});

