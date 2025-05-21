function fixPsScroll(event) {
  const container = event.currentTarget;

  if (event.type === 'ps-scroll-up' && container.prevPdBottom !== 'undefined') {
    container.style.paddingBottom = container.prevPdBottom + "px";
    return;
  } else if (event.type === 'ps-scroll-up') return;

  const containerStyles = getComputedStyle(container);
  const containerPdBottom = parseFloat(containerStyles.paddingBottom);
  const containerReach = container.perfectScrollbar.reach.y;

  if (container.prevPdBottom === undefined) {
    container.prevPdBottom = containerPdBottom;
  }
  
  if (containerReach === 'end' && event.type === 'keydown') {
    event.preventDefault();
  } else if (containerReach === 'end' && event?.deltaY < 0) {
    event.preventDefault();
    return;
  } 
  
  const reil = container.querySelector('.ps__rail-y');
  const thumb = container.querySelector('.ps__thumb-y');

  const reilHeight = parseFloat(reil.style.height);
  const thumbHeigth = parseFloat(thumb.style.height);
  const thumbTop = parseFloat(thumb.style.top);

  const difference = reilHeight - (thumbHeigth + thumbTop);

  if (difference && containerReach === 'end') {
    thumb.style.top = thumbTop + difference + 'px';
    
    const containerScrollfraction = container.scrollTop % 1;
    //На значениях шрифта 14 и 18 почему-то появляется проблема со смещением 
    //контента, которое компенсируется paddingBottom. Однако есть вероятность, 
    //что существуют и другие его размеры, при которых проявляется данный эффект
    const containerRemSize = parseFloat(getComputedStyle(container).fontSize);

    if (containerScrollfraction 
        && containerRemSize == 18 
        || containerRemSize == 14) {

      container.style.paddingBottom = containerPdBottom + 
        containerScrollfraction + "px";
      container.scrollTop = container.scrollHeight - container.clientHeight;
      container.perfectScrollbar.update();
    }
  }
}

export default fixPsScroll;