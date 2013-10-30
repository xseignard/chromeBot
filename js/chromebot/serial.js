(function($) {

  /**
   * Initialize serial port picker and serial connection
   * Inspired by: http://renaun.com/blog/2013/05/using-the-chrome-serial-api-with-arduino/
   */
  var Serial = function() {
    // fake connection id until we actually connect to a serial port
    this.connectionId = -1;
    // list and open the port
    var self = this;
    chrome.serial.getPorts(function(ports) {
       self.buildPortPicker(ports)
       self.openSelectedPort();
    });
  };
  
  /**
   * Handle the opening of the port
   * @param {Object} openInfo - Object containing the new connection ID
   */
  Serial.prototype.onOpen = function(openInfo) {
    this.connectionId = openInfo.connectionId;
    console.log('connectionId: ' + this.connectionId);
    if (this.connectionId == -1) {
      this.setStatus('Could not open');
      return;
    }
    this.setStatus('Connected!');
  };

  /**
   * Convenience function to update the serial connection status on the UI
   * @param {String} status - the new message status to display
   */
  Serial.prototype.setStatus = function(status) {
    $('#serialport').text(status);
  };

  /**
   * Constructs the port picker
   * @param {Array} ports - an array of String representing the serial ports of the machine
   */
  Serial.prototype.buildPortPicker = function(ports) {
    var portPicker = $('#port-picker');
    ports.forEach(function(port) {
      // don't handle internal linux ttys
      if (port.indexOf('ttyS') === -1) {
        portPicker.append('<option value=' + port + '>' + port + '</option>');
      }
    });
    var self = this;
    // when the selection is changed, close the previous serial port and open the new one
    portPicker.change(function() {
      if (self.connectionId != -1) {
        chrome.serial.close(self.connectionId, function() {
          self.openSelectedPort.call(self)
        });
        return;
      }
      self.openSelectedPort();
    });
  };

  /**
   * Open the selected port
   */
  Serial.prototype.openSelectedPort = function() {
    var selectedPort = $('#port-picker option:selected').val();
    if (selectedPort) {
      var self = this;
      chrome.serial.open(selectedPort, function(openInfo) {
        self.onOpen.call(self, openInfo);
      });
    }
    else {
      this.setStatus('No serial port available');
    }
  };

  /**
   * Close the opened port
   */
  Serial.prototype.closePort = function() {
    chrome.serial.close(this.connectionId);
  };

  /**
   * Send a message through the opened serial port
   * @param {Number} msg - an integer
   */
  Serial.prototype.send = function(msg) {
    var buffer = new ArrayBuffer(1);
    var uint8View = new Uint8Array(buffer);
    uint8View[0] = msg;
    chrome.serial.write(this.connectionId, buffer, function() {});
  };

  if (!window.Chromebot) window.Chromebot = {};
  window.Chromebot.Serial = Serial;
})($);