const int LED = 13;
const int MOTOR1 = 6;  
const int MOTOR2 = 5;
const int DIR1 = 7;
const int DIR2 = 4;

// default speed and direction command
int speed = 150;
int lastCmd = 11;

void Motor1(int pwm, boolean reverse) {
  analogWrite(MOTOR1,pwm);
  if(reverse) { 
    digitalWrite(DIR1,HIGH);    
  } 
  else {
    digitalWrite(DIR1,LOW);    
  }
}

void Motor2(int pwm, boolean reverse) {
  analogWrite(MOTOR2,pwm);
  if(reverse) { 
    digitalWrite(DIR2,HIGH);    
  }
  else {
    digitalWrite(DIR2,LOW);    
  }
}

void setup() {
#if defined (__AVR_ATmega32U4__)
  // arduino leonardo
  Serial1.begin(9600);
#elif defined(__AVR_ATmega328P__)
  // arduino uno
  Serial.begin(9600);
#endif
  int i;
  for(i=4;i<=7;i++) {
    pinMode(i, OUTPUT);
  }
  pinMode(LED, OUTPUT);
}

void loop() {
#if defined (__AVR_ATmega32U4__)
  // arduino leonardo
  if (Serial1.available() > 0) {
    int i = Serial1.read();
#elif defined(__AVR_ATmega328P__)
  // arduino uno
  if (Serial.available() > 0) {
    int i = Serial.read();
#endif
    // when i >= 30 it's about speed
    if (i >= 30) {
      speed = map(i - 30, 0, 9, 0, 255);
    }
    // otherwise it's about direction
    else {
      lastCmd = i;
    }
  }
  // always update direction with the new received values
  updateDirection();
}

void updateDirection() {
  switch (lastCmd) {
    // forward/left
    case 0:
      Motor1(speed,false);
      Motor2(speed/2,false);
      break;
    // left
    case 1:
      Motor1(speed,false);
      Motor2(speed,true);
      break;
    // backward/left
    case 2:
      Motor1(speed,true);
      Motor2(speed/2,true);
      break;
    // forward
    case 10:
      Motor1(speed,false);
      Motor2(speed,false);
      break;
    // stop
    case 11:
      Motor1(0,false);
      Motor2(0,false);
      break;
    // backward
    case 12:
      Motor1(speed,true);
      Motor2(speed,true);
      break;
    // forward/right
    case 20:
      Motor1(speed/2,false);
      Motor2(speed,false);
      digitalWrite(LED, 0);
      break;
    // right
    case 21:
      Motor1(speed,true);
      Motor2(speed,false);
      break;
    // backward/right
    case 22:
      Motor1(speed/2,true);
      Motor2(speed,true);
      break;
  }
}