window.onload = function() {

  ui.init();
  serial.init();

  gamepad.init({
    unsupportedAPI : function() {
      console.log('Unsupported API');
    },
    handleEvent : function(gamepad) {
      var xAxis = gamepad.axes[0];
      var yAxis = gamepad.axes[1];
      ui.updateUI(xAxis, yAxis);
      updateSerial(xAxis, yAxis);
    }
  });

  var updateSerial = function(xAxis, yAxis) {
    if (xAxis === 1 && yAxis === 1) {
      serial.send(1);
      //console.log(1);
    }
    else {
      serial.send(0);
      //console.log(0);
    }
  };
};

