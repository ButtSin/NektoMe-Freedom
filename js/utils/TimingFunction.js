class TimingFunction {
  constructor() {
    this.timingFunctions = [this.linear, this.quad];
  }

  linear(timeFraction) {
    return timeFraction;
  }

  quad(timeFraction) {
    return Math.pow(timeFraction, 2)
  }

  makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
  }

  getRandomTimingFunction() {
    if (Math.round(Math.random())) {
      return this.timingFunctions[Math.floor(Math.random() * 
        this.timingFunctions.length)];
    } else {
      return this.makeEaseOut(this.timingFunctions[Math.floor(Math.random() * 
        this.timingFunctions.length)]);
    }
  }
}

export default TimingFunction;