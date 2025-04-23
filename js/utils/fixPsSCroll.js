function fixPsSCroll(event) {
  const container = event.currentTarget;
  const containerStyles = getComputedStyle(container);
  const containerPdBottom = parseFloat(containerStyles.paddingBottom);
  const containerReach = container.perfectScrollbar.reach.y;
  
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
    }
  }
}

export default fixPsSCroll;