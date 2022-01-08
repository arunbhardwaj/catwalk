import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../request.js';
import { HomeContainer } from '../styles/Home/index.styled.js';
import { Link } from 'react-router-dom';
import Product from './Product.jsx';

// Products splash page
const Home = () => {
  const [products, setProducts] = useState([]);
  const [ thumbnails, setThumbnails ] = useState([]);

  // On mount, retrieve product and styles
  useEffect(() => {
    getAllProducts()
      .then(results => setProducts(results.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <HomeContainer className='home-page'>
      { products.map( (product, i) => {
        return (
          <Link to={`/${product.id}`}>
            <Product
              id={product.id}
              name={product.name}
              price={product.default_price}
              key={i}
            />
          </Link>
        )
      }) }
    </HomeContainer>
  )
}

export default Home;