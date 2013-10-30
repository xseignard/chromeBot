(function(Modernizr) {

  /**
   * Initialize support for Gamepad API
   * Inspired by: http://www.html5rocks.com/en/tutorials/doodles/gamepad/
   * @param {Object} opts - an Object containing a callback if the API is not supported 
   *                        and another one to handle new gamepad data
   */
  var Gamepad = function(opts) {
    // Whether we’re requestAnimationFrameing like it’s 1999.
    this.ticking = false;
    // Previous timestamp for gamepad state
    this.prevTimestamp = 0;

    if (Modernizr.gamepads) {
      if (opts.handleEvent && typeof opts.handleEvent === 'function') {
        this.handleEvent = opts.handleEvent;
      }
      this.startPolling();
    } 
    else {
      if (opts.unsupportedAPI && typeof opts.unsupportedAPI === 'function') {
        opts.unsupportedAPI();
      }
    }
  };

  /**
   * Starts a polling loop to check for gamepad state.
   */
  Gamepad.prototype.startPolling = function() {
    // Don’t accidentally start a second loop, man.
    if (!this.ticking) {
      this.ticking = true;
      this.tick();
    }
  };

  /**
   * Stops a polling loop by setting a flag which will prevent the next
   * requestAnimationFrame() from being scheduled.
   */
  Gamepad.prototype.stopPolling = function() {
    this.ticking = false;
  };

  /**
   * A function called with each requestAnimationFrame(). Polls the gamepad
   * status and schedules another poll.
   */
  Gamepad.prototype.tick = function() {
    this.pollGamepad();
    this.scheduleNextTick();
  };

  /**
   * Poll again during the next animation frame
   */
  Gamepad.prototype.scheduleNextTick = function() {
    if (this.ticking) {
      var self = this;
      window.requestAnimationFrame(function() {
        self.tick.call(self)
      });
    }
  };

  /**
   * Poll the gamepad status
   */
  Gamepad.prototype.pollGamepad = function() {
    // check if there is a connected gamepad
    this.gamepad = navigator.webkitGetGamepads()[0];
    if (this.gamepad) {
      var timestamp = this.gamepad.timestamp;
      // something happened during this time frame
      if (timestamp !== this.prevTimestamp) {
        this.prevTimestamp = this.gamepad.timestamp;
        this.handleEvent(this.gamepad);
      }
    }
  };

  if (!window.Chromebot) window.Chromebot = {};
  window.Chromebot.Gamepad = Gamepad;
})(Modernizr);
