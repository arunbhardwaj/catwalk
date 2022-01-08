import React, { useContext, useState, useEffect } from 'react';
import ExpandedView from './ExpandedView.jsx';
import ModalForm from '../shared/Modal.jsx';
import { getProductStyles, getProductPhotosOfAStyle  } from '../../request.js';
import Selectors from './selectors.jsx';
import ProductDetails from './productDetails.jsx';
import { OverviewContext } from './OverviewContext.jsx';
import { ProductDetailsContainer } from '../styles/Overview/ProductDetails.styled.js';
import { DefaultViewContainer, BackgroundImageContainer, BackgroundImage, ThumbnailSliderContainer } from '../styles/Overview/DefaultView.styled';
import { Arrow, FadedArrow, ActiveThumbnail, FadedThumbnail, ThumbnailContainer, SliderContainer } from '../styles/Overview/Slider.styled';
import ChevronUp from '../../assets/images/chevron-up.svg'
import ChevronDown from '../../assets/images/chevron-down.svg'

export const DefaultView = (props) => {
  const [ styles, setStyles ] = useState([]);
  const [ selectedStyle, setSelectedStyle ] = useState(props.styles[0].style_id);
  const [ expandedView, setExpandedView ] = useState(false);
  const { images, setImages, currentImage, handleKeyPress } = useContext(OverviewContext);
  const context = useContext(OverviewContext);

  useEffect( () => {
    getProductPhotosOfAStyle(props.productId, selectedStyle)
      .then( (results) => {
        setImages(results.photos.map((photo, id) => {
          return {id, ...photo}}
        ));
      })
      .catch( (err) => {
        console.error(err);
      });
  }, [selectedStyle]);

  const handleImageClick = () => {
    setExpandedView(true);
  }

  const updateStyle = (styleId) => {
    setSelectedStyle(styleId);
  }

  return (
    <DefaultViewContainer className='default-view-container'
      tabIndex='0'
      onKeyUp={(e) => { e.preventDefault(); handleKeyPress(e); }} >
      <ThumbnailSliderContainer className='thumbnail-slider-container'>
        <ThumbnailSlider />
      </ThumbnailSliderContainer>
      <BackgroundImageContainer className='background-img-container'>
        {images.length && <BackgroundImage src={images[currentImage].url} onClick={handleImageClick} />}
      </BackgroundImageContainer>
      <ProductDetailsContainer>
        <ProductDetails
          product={props.product}
          productId={props.productId}
          rating={props.rating}
        />
        <br></br>
        <Selectors
          productId={props.productId}
          styles={props.styles}
          addItemToCart={props.addItemToCart}
          updateStyle={updateStyle}
        />
      </ProductDetailsContainer >
      { expandedView ? <ModalForm submitInModal={false} toggleModal={() => {setExpandedView(false)}} >
        <ExpandedView src={images[currentImage].url} />
      </ModalForm> : null}
    </DefaultViewContainer>
  );
};

export const ThumbnailSlider = () => {
  const { images, currentImage, displayNextImage, displayPrevImage } = useContext(OverviewContext);
  let isAboveLowerBounds = currentImage > 0;
  let isBelowUpperBounds = currentImage < images.length - 1;

  return (
    <SliderContainer>
      <Arrow className={isAboveLowerBounds ? 'showContent' : 'hideContent'} src={ChevronUp} onClick={() => (isAboveLowerBounds) ? displayPrevImage() : {}} />
      {images.map((image, idx) => (idx < 7) ?
        <ThumbnailItem key={image.id} id={image.id} image={image}/>
        : null
      )}
      <Arrow className={isBelowUpperBounds ? 'showContent' : 'hideContent'} src={ChevronDown} onClick={() => (isBelowUpperBounds) ? displayNextImage() : {}} />
    </SliderContainer>
  );
};


export const ThumbnailItem = ({image}) => {
  const { images, currentImage, setCurrentImage } = useContext(OverviewContext);
  let isSelected = image.id === currentImage;

  return (
    <ThumbnailContainer key={image.id} className="thumbnail item" onClick={() => setCurrentImage(image.id)}>
      {(!isSelected) && <FadedThumbnail src={image.thumbnail_url} />}
      {isSelected && <ActiveThumbnail src={image.thumbnail_url} />}
    </ThumbnailContainer>
  )
}