window.onload = function() {

  var ui = new Chromebot.UI();
  //ui.init();
  var serial = new Chromebot.Serial();

  var gamepad = new Chromebot.Gamepad({
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

  var values = [-1,0,1];
  var updateSerial = function(xAxis, yAxis) {
    var msg = 0;
    if (values.indexOf(xAxis) > -1 && values.indexOf(yAxis) > -1) {
      switch (xAxis) {
        case -1:
          msg += 0;
          break;
        case 0:
          msg += 10;
          break;
        case 1:
          msg += 20;
          break;
      }
      switch (yAxis) {
        case -1:
          msg += 0;
          break;
        case 0:
          msg += 1;
          break;
        case 1:
          msg += 2;
          break;
      }
      console.log(msg);
      serial.send(msg);
    }
  };

  chrome.app.window.onClosed.addListener(function() {
    gamepad.stopPolling();
    serial.closePort();
  });
};

