 var ui = {  

  init: function() {
    var elem = $('#canvasDiv')[0];
    ui.params = { 
      width: $(elem).width(),
      height: $(elem).height(),
      radius: 50
    };
    ui.two = new Two(ui.params).appendTo(elem);
    ui.circle = ui.two.makeCircle(ui.params.width/2, ui.params.height/2, ui.params.radius);
    ui.circle.fill = '#FF8000';
    ui.circle.stroke = 'orangered';
    ui.circle.linewidth = 5;

    ui.two.update();
    
    ui.started = false;
  },

  updateUI: function(xAxis, yAxis) {
    
    var map = function(value, min, max) {
      var srcMax = 2,
        dstMax = max - min,
        adjValue = value + 1;
      return (adjValue * dstMax / srcMax) + min;
    };
    
    if (!ui.started) {
      ui.started = true;
      $('#gamepad').text('Connected!');
    }
    else {
      $('#xAxisText').text(xAxis);
      $('#yAxisText').text(yAxis);
      $('#xAxis').val(map(xAxis, -1000, 1000));
      $('#yAxis').val(map(yAxis, -1000, 1000));
      ui.circle.translation.set(
        map(xAxis, ui.params.radius, ui.params.width - ui.params.radius),
        map(yAxis, ui.params.radius, ui.params.height - ui.params.radius)
      );
      ui.two.update();
    }
  }
};