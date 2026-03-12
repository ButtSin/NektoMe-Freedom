class Animation {
  constructor({ timing, draw, duration, onEnd }) {
    this.timing = timing;
    this.draw = draw;
    this.duration = duration;
    this.onEnd = onEnd;
    this.cancelled = false;

    this.animationId = null;
  }

  animate = () => {
    this.cancelled = false;

    let start = performance.now();

    const animateStep = (time) => {
      if (this.cancelled) {
        this.animationId = null;
        return;
      }

      let timeFraction = (time - start) / this.duration;

      let progress = this.timing(timeFraction);

      this.draw(progress);

      if (timeFraction < 1) {
        this.animationId = requestAnimationFrame(animateStep);
      } else {
        timeFraction = 1;
        this.onEnd?.();
        this.animationId = null;
      }
    };

    this.animationId = requestAnimationFrame(animateStep);
  };

  stopAnimation = () => {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  };

  cancel = () => {
    this.cancelled = true;
    this.stopAnimation();
  };
}

export default Animation;
