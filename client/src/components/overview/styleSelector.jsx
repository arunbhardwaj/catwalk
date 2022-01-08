import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import StyleThumbnail from './styleThumbnail.jsx';

const StyleSelector = ( {styles, handleStyleSelect} ) => {
  const [selected, setSelected] = useState(styles[0].style_id);

  return (
    <div>
      { styles.map( (style, i) => {
        let url = style.photos[0].thumbnail_url;

        return ( <StyleThumbnail
          className='style-thumbnail'
          url={url}
          info={style}
          isSelected={selected === style.style_id}
          key={i}
          onClick={ () => {
            setSelected(style.style_id);
            handleStyleSelect(style);
          }} />)
      }) }
    </div>
  )
}

export default StyleSelector;