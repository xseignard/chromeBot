window.onload = function() {

  // compute the gamepad data and send serial messages
  var updateSerial = function(gamepad) {
    // speed command
    // translate speed data from y axis of the second stick from [-1,1] to [30,39]
    var speed = Math.abs(9 - Math.floor((gamepad.axes[3] + 1) *9 / 2)) + 30;
    console.log("Speed: " + speed);
    serial.send(speed);

    // direction command
    var xAxis = gamepad.axes[0];
    var yAxis = gamepad.axes[1];
    var values = [-1,0,1];
    var cmd = 0;
    // only send "direction" messages when x/y axis of the first stick is -1, 0 or 1
    if (values.indexOf(xAxis) > -1 && values.indexOf(yAxis) > -1) {
      switch (xAxis) {
        case -1:
          cmd += 0;
          break;
        case 0:
          cmd += 10;
          break;
        case 1:
          cmd += 20;
          break;
      }
      switch (yAxis) {
        case -1:
          cmd += 0;
          break;
        case 0:
          cmd += 1;
          break;
        case 1:
          cmd += 2;
          break;
      }
      console.log("Command: " + cmd);
      serial.send(cmd);
    }
  };

  var ui = new Chromebot.UI();
  var serial = new Chromebot.Serial();
  var gamepad = new Chromebot.Gamepad({
    unsupportedAPI : function() {
      console.log('Unsupported API');
    },
    handleEvent : function(gamepad) {
      ui.updateUI(gamepad);
      updateSerial(gamepad);
    }
  });

  chrome.app.window.onClosed.addListener(function() {
    gamepad.stopPolling();
    serial.closePort();
  });
};

