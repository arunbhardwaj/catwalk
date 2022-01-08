import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { getProductStyles } from '../request.js';
import { TOKEN } from '../../../config.js';
import Product from './Product.jsx';
import { HomeContainer } from './index.styled.js';

const Home = () => {
  const [ products, setProducts ] = useState([]);
  const [ thumbnails, setThumbnails ] = useState([]);

  useEffect( () => {
    const config = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/?count=10',
      headers: {
        'Authorization': `${TOKEN}`,
      }
    };

    axios(config)
      .then( ({data}) => {
        setProducts(data);

        // TODO: Get a thumbnail for each style
        const thumbnails = [];

      })
      .catch( (error) => {
        console.log(error);
      });
  }, []);

  return (
    <HomeContainer className='home-page'>
      { products.map( (product, i) => {
        return (
          <Product
            id={product.id}
            name={product.name}
            price={product.default_price}
            key={i}
          />
        )
      }) }
    </HomeContainer>
  )
}

// ReactDOM.render(<Home />, document.getElementById('app'));