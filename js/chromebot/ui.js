(function() {
  
  /*
   * Inits the UI
   */
  var UI = function() {  
   
    var elem = $('#canvasDiv')[0];
    // some params for the visual feedback
    this.params = { 
      width: $(elem).width(),
      height: $(elem).height(),
      radius: 15
    };
    // create the canvas context thanks to two.js
    this.two = new Two(this.params).appendTo(elem);

    // draw some lines for the visual feedback
    var verticalLine = this.two.makeLine(this.params.width/2, 0, this.params.width/2, this.params.height);
    var horizontalLine = this.two.makeLine(0, this.params.height/2, this.params.width, this.params.height/2);
    var ltrlLine = this.two.makeLine(0, 0, this.params.width, this.params.height);
    var rtlLine = this.two.makeLine(0, this.params.height, this.params.width, 0);
    verticalLine.stroke = horizontalLine.stroke = ltrlLine.stroke = rtlLine.stroke = '#999';
    verticalLine.linewidth = horizontalLine.linewidth = ltrlLine.linewidth = rtlLine.linewidth = 1;
    verticalLine.opacity = horizontalLine.opacity = ltrlLine.opacity = rtlLine.opacity = 0.75;
    
    // place the pointer that symbolize the joystick position at the center of the canvas
    this.pointer = this.two.makeCircle(this.params.width/2, this.params.height/2, this.params.radius);
    this.pointer.fill = '#4387FD';
    this.pointer.linewidth = 0;

    this.two.update();
    
    this.started = false;
  };

  /*
   * Update the ui given the new computed x/y axis of the first stick of the gamepad
   * @param {Object} gamepad - gamepad data
   */
  UI.prototype.updateUI = function(gamepad) {
    // internal utility to map -1/1 values to the given range
    var map = function(value, min, max) {
      var srcMax = 2,
        dstMax = max - min,
        adjValue = value + 1;
      return (adjValue * dstMax / srcMax) + min;
    };
    // relevant values to update the UI
    var xAxis = gamepad.axes[0];
    var yAxis = gamepad.axes[1];
    // first update is launched when a button of the joystick is pressed
    // so tell the user the joystick is connected
    if (!this.started) {
      this.started = true;
      $('#gamepad').text('Connected!');
    }
    else {
      // translate the pointer with the new coordinates from the joystick
      this.pointer.translation.set(
        map(xAxis, this.params.radius, this.params.width - this.params.radius),
        map(yAxis, this.params.radius, this.params.height - this.params.radius)
      );
      this.two.update();
    }
  };

  if (!window.Chromebot) window.Chromebot = {};
  window.Chromebot.UI = UI;
})();