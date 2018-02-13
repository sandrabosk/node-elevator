class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.waitingList = [];
    this.passengers = [];
    this.direction  = "";
    this.intervalId;
  }

  start(){
    this.intervalId = setInterval(() => {
      this.update();
    }, 1000);
    
   }
  stop() { 
    clearInterval(this.intervalId);
  }
  update() {
    this.log();
      if (this.requests.length === 0){
        if(this.waitingList.length === 0){
          console.log("Nobody is waiting!");
          this.stop();
          // if(this.floorDown > 0){
          //   this.floorDown();
          // } else {
          //   this.requests.push(this.waitingList[0].originFloor)
          // }
        }
      } else {
          this.whereWhat();
      }
   }
whereWhat(){
  if(this.requests[0] > this.floor){
    this.floorUp();
  } else if (this.requests[0] < this.floor){
    this.floorDown();
  } else {
    this.requests = this.requests.filter((any) => {
      return any !==this.floor;
    });
  }
}

  _passengersEnter() {
    this.waitingList.forEach((person, index) => {
      if(person.originFloor === this.floor){
        this.passengers.push(person);
        this.requests.push(person.destinationFloor);
        this.waitingList.splice(index, 1);
        console.log(`${person.name} has entered the elevator.`);
      }
    });
    // this.waitingList = this.waitingList.filter((person) => {
    //   return person.originFloor !== this.floor;
    // });
   }

  _passengersLeave() { 
    this.passengers.forEach((passenger, index) => {
      if(passenger.destinationFloor === this.floor){
        this.passengers.splice(index, 1);
        console.log(`${passenger.name} has left the elevator.`);
      }
    });
  }
  floorUp() {
    if(this.floor < this.MAXFLOOR){
      this.floor++;
      this.direction = "Up";
      this._passengersEnter();
      this._passengersLeave();
    } else {
      console.log("You're on the last floor!");
    }
   }

  floorDown() { 
    if(this.floor > 0){
      this.floor --;
      this.direction = "Down";
      this._passengersEnter();
      this._passengersLeave();
    } else {
      console.log("You're on the ground floor!"); 
    }
  }

  call(person) { 
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }
  
  log() {
    let list = [];
    this.waitingList.forEach((el) => {
      list.push((`${el.name}`));
    });
    let passengers = [];
    this.passengers.forEach((el) => {
      passengers.push((`${el.name}`))
    });
      console.log(`Direction: ${this.direction} | Floor: ${this.floor} | Passengers: ${passengers.join(' , ')} | WaitingList: ${list.join(' , ')} | Requests: ${this.requests}`);
  }
}

module.exports = Elevator;
