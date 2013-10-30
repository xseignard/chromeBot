const int LED = 13;

void setup() {
#if defined (__AVR_ATmega32U4__)
  // arduino leonardo
  Serial1.begin(9600);
#elif defined(__AVR_ATmega328P__)
  // arduino uno
  Serial.begin(9600);
#endif
  pinMode(LED, OUTPUT);
}

void loop() {
  // data received
#if defined (__AVR_ATmega32U4__)
  // arduino leonardo
  if (Serial1.available() > 0) {
    int i = Serial1.read();
#elif defined(__AVR_ATmega328P__)
  // arduino uno
  if (Serial.available() > 0) {
    int i = Serial.read();
#endif
    // the value maps to a direction
    switch (i) {
      // forward/left
      case 0:
        digitalWrite(LED, 0);
        break;
      // left
      case 1:
        digitalWrite(LED, 1);
        break;
      // backward/left
      case 2:
        digitalWrite(LED, 0);
        break;
      // forward
      case 10:
        digitalWrite(LED, 1);
        break;
      // stop
      case 11:
        digitalWrite(LED, 0);
        break;
      // backward
      case 12:
        digitalWrite(LED, 1);
        break;
      // forward/right
      case 20:
        digitalWrite(LED, 0);
        break;
      // right
      case 21:
        digitalWrite(LED, 1);
        break;
      // backward/right
      case 22:
        digitalWrite(LED, 0);
        break;
    }
  }
}