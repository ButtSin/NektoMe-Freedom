function fixPsSCroll(event) {
  const container = event.currentTarget;
  const containerStyles = getComputedStyle(container);
  const containerPdBottom = parseFloat(containerStyles.paddingBottom);
  
  const reil = container.querySelector('.ps__rail-y');
  const thumb = container.querySelector('.ps__thumb-y');

  const reilHeight = parseFloat(reil.style.height);
  const thumbHeigth = parseFloat(thumb.style.height);
  const thumbTop = parseFloat(thumb.style.top);
  
  const difference = reilHeight - (thumbHeigth + thumbTop);

  if (difference) {
    thumb.style.top = thumbTop + difference + 'px';
    
    const containerScrollfraction = container.scrollTop % 1;
    const containerRemSize = parseFloat(getComputedStyle(container).fontSize);

    //На значениях 14 и 18 почему-то появляется проблема со смещением контента, 
    //которое компенсируется paddingBottom. Однако есть вероятность, что 
    //существуют и другие размеры шрифта, при которых проявляется данный эффект.
    if (containerScrollfraction && containerRemSize == 18 
    || containerRemSize == 14) {
      container.style.paddingBottom = containerPdBottom + 
        containerScrollfraction + "px";
    }
  }
}

export default fixPsSCroll;