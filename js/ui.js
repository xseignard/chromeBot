 var ui = {  

  init: function() {
    var elem = $('#canvasDiv')[0];
    ui.params = { 
      width: $(elem).width(),
      height: $(elem).height(),
      radius: 15
    };
    ui.two = new Two(ui.params).appendTo(elem);

    var verticalLine = ui.two.makeLine(ui.params.width/2, 0, ui.params.width/2, ui.params.height);
    verticalLine.stroke = '#999';
    verticalLine.linewidth = 1;
    verticalLine.opacity = 0.75;

    var horizontalLine = ui.two.makeLine(0, ui.params.height/2, ui.params.width, ui.params.height/2);
    horizontalLine.stroke = '#999';
    horizontalLine.linewidth = 1;
    horizontalLine.opacity = 0.75;

    var ltrlLine = ui.two.makeLine(0, 0, ui.params.width, ui.params.height);
    ltrlLine.stroke = '#999';
    ltrlLine.linewidth = 1;
    ltrlLine.opacity = 0.75;

    var rtlLine = ui.two.makeLine(0, ui.params.height, ui.params.width, 0);
    rtlLine.stroke = '#999';
    rtlLine.linewidth = 1;
    rtlLine.opacity = 0.75;

    ui.pointer = ui.two.makeCircle(ui.params.width/2, ui.params.height/2, ui.params.radius);
    ui.pointer.fill = '#4387FD';
    ui.pointer.linewidth = 0;

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
      ui.pointer.translation.set(
        map(xAxis, ui.params.radius, ui.params.width - ui.params.radius),
        map(yAxis, ui.params.radius, ui.params.height - ui.params.radius)
      );
      ui.two.update();
    }
  }
};