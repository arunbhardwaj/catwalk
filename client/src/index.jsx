import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { TOKEN } from '../../config.js';
import Selectors from './components/overview/selectors.jsx';
import Reviews from './components/reviews/Reviews.jsx';
import { Provider as QAProvider } from './components/QA/QAContext.jsx';
import QuestionsAnswers from './components/QA/QASection.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      styles: [],
      reviews: [],
    };

    this.getStyles = this.getStyles.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  // On mount, retrieve product and styles
  componentDidMount() {
    const config = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/39333',
      headers: {
        'Authorization': `${TOKEN}`,
      }
    };

    axios(config)
      .then( (results) => {
        this.setState({
          product: results.data
        });
        this.getStyles();
        this.getReviews();
      })
      .catch( (err) => {
        console.error(err);
        console.error('index.jsx | mount failed');
      });
  }

  // Retrieve product's styles from API, set state to reflect those styles
  getStyles() {
    const config = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/products/39333/styles',
      headers: {
        'Authorization': `${TOKEN}`,
      }
    };

    axios(config)
      .then( (styles) => {
        this.setState({
          styles: styles.data.results,
        });
      })
      .catch( (err) => {
        console.error(err);
        console.error('index.jsx | failed to get styles');
      });
  }

  // GET all reviews for a product
  getReviews() {
    const config = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/reviews/?sort="relevant"&product_id=${this.props.productId}`,
      headers: {
        'Authorization': `${TOKEN}`,
      }
    };

    axios(config)
      .then( (reviews) => {
        this.setState({
          reviews: reviews.data.results
        })
      })
      .catch( (err) => {
        console.error(err);
        console.error('index.jsx | failed to fetch reviews');
      })
  }

  // POST the item obj to the API
  addItemToCart( item ) {
    let config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-nyc/cart`,
      headers: {
        'Authorization': `${TOKEN}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(item),
    }

    axios(config)
      .catch( (err) => {
        console.error(err);
      })
  }

  render() {
    return (
      <div>
        <div className='overview'>
          <h2>Overview!</h2>
          <div className='image-gallery'>
            Image gallery here!
          </div>
          <div className='product-detail'>
            Product details here!
          </div>
          <br></br>
          <Selectors
            addToCart={this.addItemToCart}
            styles={this.state.styles}
            product={this.state.product}
            productId={this.props.productId}
          />
        </div>
        <br></br>
        <div className='ratings-and-reviews'>
          <Reviews
            reviews={this.state.reviews}
            productId={this.props.productId}
          />
        </div>
        <br></br>
        <div className='q-and-a'>
        <QAProvider>
          <QuestionsAnswers />
          <button className='add-question'>Add a question</button>
          <button className='add-answer'>Add an answer [modal]</button>
        </QAProvider>
        </div>
        <br></br>
        <div className='related-items-comparison'>
          <h2>Related items and comparison!</h2>
          <div className='related-products'>
            Not sure what goes in here yet
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App productId={39333}/>, document.getElementById('app'));
