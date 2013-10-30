const int LED = 13;

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
}

void loop() {
  // data received
  if (Serial.available() > 0) {
    int i = Serial.read();
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