class Animation {
  constructor({timing, draw, duration, onEnd}) {
    this.timing = timing;
    this.draw = draw;
    this.duration = duration;
    this.onEnd = onEnd;
    
    this.animationId = null;
  }

  animate() {
    let start = performance.now();

    const animateStep = (time) => {
      let timeFraction = (time-start) / this.duration;

      let progress = this.timing(timeFraction);
      
      this.draw(progress);

      if (timeFraction < 1) {
        this.animationId = requestAnimationFrame(animateStep);
      } else {
        timeFraction = 1;
        this.onEnd?.();
        this.animationId = null;
      }
    }

    this.animationId = requestAnimationFrame(animateStep);
  }

  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;  
    }
  }
}

export default Animation;