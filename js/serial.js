var serial = {
  
  connectionId: -1,

  init: function() {
    chrome.serial.getPorts(function(ports) {
       serial.buildPortPicker(ports)
       serial.openSelectedPort();
    });
  },
  
  onOpen: function(openInfo) {
    serial.connectionId = openInfo.connectionId;
    console.log('connectionId: ' + serial.connectionId);
    if (serial.connectionId == -1) {
      serial.setStatus('Could not open');
      return;
    }
    serial.setStatus('Connected!');
  },

  setStatus: function(status) {
    $('#serialport').text(status);
  },

  buildPortPicker: function(ports) {
    var portPicker = $('#port-picker');
    ports.forEach(function(port) {
      // dont handle internal linux ttys
      if (port.indexOf('ttyS') === -1) {
        portPicker.append('<option value=' + port + '>' + port + '</option>');
      }
    });

    portPicker.change(function() {
      if (serial.connectionId != -1) {
        chrome.serial.close(serial.connectionId, serial.openSelectedPort);
        return;
      }
      serial.openSelectedPort();
    });
  },

  openSelectedPort: function() {
    var selectedPort = $('#port-picker option:selected').val();
    chrome.serial.open(selectedPort, serial.onOpen);
  },

  send: function(msg) {
    var buffer = new ArrayBuffer(1);
    var uint8View = new Uint8Array(buffer);
    uint8View[0] = msg;
    chrome.serial.write(serial.connectionId, buffer, function() {});
  }

};