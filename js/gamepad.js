var gamepad = {
  // Whether we’re requestAnimationFrameing like it’s 1999.
  ticking: false,

  // Previous timestamp for gamepad state
  prevTimestamp: 0,

  /**
   * Initialize support for Gamepad API.
   */
  init: function(opts) {
    if (Modernizr.gamepads) {
      if (opts.handleEvent && typeof opts.handleEvent === 'function') {
        gamepad.handleEvent = opts.handleEvent;
      }
      gamepad.startPolling();
    } 
    else {
      if (opts.unsupportedAPI && typeof opts.unsupportedAPI === 'function') {
        opts.unsupportedAPI();
      }
    }
  },

  /**
   * Starts a polling loop to check for gamepad state.
   */
  startPolling: function() {
    // Don’t accidentally start a second loop, man.
    if (!gamepad.ticking) {
      gamepad.ticking = true;
      gamepad.tick();
    }
  },

  /**
   * Stops a polling loop by setting a flag which will prevent the next
   * requestAnimationFrame() from being scheduled.
   */
  stopPolling: function() {
    gamepad.ticking = false;
  },

  /**
   * A function called with each requestAnimationFrame(). Polls the gamepad
   * status and schedules another poll.
   */
  tick: function() {
    gamepad.pollGamepad();
    gamepad.scheduleNextTick();
  },

  /**
   * Poll again during the next animation frame
   */
  scheduleNextTick: function() {
    if (gamepad.ticking) {
      window.requestAnimationFrame(gamepad.tick);
    }
  },

  /**
   * Poll the gamepad status
   */
  pollGamepad: function() {
    // check if there is a connected gamepad
    gamepad.gamepad = navigator.webkitGetGamepads()[0];
    if (gamepad.gamepad) {
      var timestamp = gamepad.gamepad.timestamp;
      // something happened during this time frame
      if (timestamp !== gamepad.prevTimestamp) {
        gamepad.prevTimestamp = gamepad.gamepad.timestamp;
        gamepad.handleEvent(gamepad.gamepad);
      }
    }
  }
};
