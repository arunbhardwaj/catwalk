import axios from 'axios';
import {TOKEN} from '../../config.js';

const header = {
  Authorization: TOKEN
};

/**
 * Returns a promise that resolves to all questions for a given product.
 *
 * @param {number} productId The product_id you want questions for.
 * @returns {Promise<any>} Promise object representing api results
 */
export function getAllQuestions(productId) {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/qa/questions', {
    headers: header,
    params: {
      product_id: productId
    }
  })
}

export function getAllProducts() {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products', {
    headers: header,
  })
}

export function getProductInfo(productId) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productId}`, {
    headers: header,
  })
}

export function getProductStyles(productId) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/${productId}/styles`, {
    headers: header,
  })
}

