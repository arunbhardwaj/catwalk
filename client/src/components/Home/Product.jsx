import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextContainer, Image, ProductContainer } from '../styles/Home/Product.styled.js';

const Product = ( {id, name, price} ) => {
  return (
    <ProductContainer className='product'>
      <Image src={`https://source.unsplash.com/user/c_v_r`} alt={'I am under construction :)'}/>
      <TextContainer className='product-name'>{name}</TextContainer>
      <TextContainer className='product-price'>{price}</TextContainer>
    </ProductContainer>
  )
}

export default Product;