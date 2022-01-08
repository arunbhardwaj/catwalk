import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Figure, Image } from '../styles/Overview/ExpandedView.styled.js';
import { OverviewContext } from './OverviewContext.jsx';
import { DefaultViewContainer, BackgroundImageContainer, BackgroundImage, ThumbnailSliderContainer } from '../styles/Overview/DefaultView.styled';
import { Arrow, FadedArrow, ActiveThumbnail, FadedThumbnail, ThumbnailContainer, SliderContainer } from '../styles/Overview/Slider.styled';

const ExpandedView = ( {src} ) => {
  const [ position, setPosition ] = useState('0% 0%');

  // Handles modal window overflow
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalOverflow);
  }, [zoom]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    setPosition(`${x}% ${y}%`);
  }

  return (
    <Figure className='expanded-view'
      onMouseMove={handleMouseMove}
      style={ {backgroundImage: `url(${src})`, backgroundPosition: `${position}`}}>
      <Image className='expanded-thumbnail' src={src} />
    </Figure>
  )
}

export default ExpandedView;