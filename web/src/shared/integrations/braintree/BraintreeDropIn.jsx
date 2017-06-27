import React from 'react';
import ReactDOM from 'react-dom';
import * as braintree from 'braintree-web';
import cx from 'classnames';


class BraintreeDropIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsLoaded: false,
      cardsLoaded: false,
      cards: [],
      error: null,
      formState: {},
      selectedCard: null,
    };

    this.braintreeInstance = null;
    this.braintreeHostedFields = null;

    this.setError = this.setError.bind(this);
    this.tokenize = this.tokenize.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.braintreeClientInit = this.braintreeClientInit.bind(this);
    this.braintreeHandleCards = this.braintreeHandleCards.bind(this);
    this.braintreeHostedFieldsInit = this.braintreeHostedFieldsInit.bind(this);
    this.onNewPaymentMethod = this.onNewPaymentMethod.bind(this);
  }

  setError(err) {
    this.setState({
      error: err,
    });
  }

  braintreeClientInit(err, clientInstance) {
    if (err) {
      this.setError(err);
      return;
    }

    // Get previously saved cards
    clientInstance.request({
      endpoint: 'payment_methods',
      method: 'get',
      data: {
        defaultFirst: 1
      }
    }, this.braintreeHandleCards);

    this.braintreeInstance = clientInstance;

    // Create hosted fields instance
    braintree.hostedFields.create({
      client: clientInstance,
      styles: {
        input: {
          'font-size': '16px'
        }
      },
      fields: {
        number: {
          selector: '#braintree-number',
        },
        cvv: {
          selector: '#braintree-cvv',
        },
        expirationDate: {
          selector: '#braintree-expiry'
        },
      }
    }, this.braintreeHostedFieldsInit);
  }

  braintreeHandleCards(err, response) {
    if (err) {
      console.log('Braintree failed to get list of saved cards:', err);

      this.setState({
        cardsLoaded: true,
      });

      return;
    }

    const cards = response.paymentMethods;
    let selectedCard = null;
    if (cards.length) {
      selectedCard = cards[0];
    }

    this.setState({
      cardsLoaded: true,
      cards,
      selectedCard,
    });
  }

  braintreeHostedFieldsInit(err, hostedFieldsInstance) {
    if (err) {
      this.setError(err);
      return;
    }

    this.hostedFieldsInstance = hostedFieldsInstance;

    this.setState({
      fieldsLoaded: true,
    });

    // Validators
    hostedFieldsInstance.on('cardTypeChange', (event) => {
      let cardType = null;

      if (event.cards.length === 1) {
        cardType = event.cards[0].type;
      }

      this.setState({
        cardType
      });
    });

    hostedFieldsInstance.on('validityChange', (event) => {
      const newState = {};
      ['number', 'cvv', 'expirationDate'].forEach(t => {
        newState[t] = event.fields[t].isValid
      });

      this.setState({
        formState: newState,
      })
    });
  }

  validateForm() {
    const formState = this.state.formState;

    let isValid = true;

    ['number', 'cvv', 'expirationDate'].forEach(t => {
      const value = formState[t];

      if (typeof value === 'undefined') {
        formState[t] = false;
        isValid = false;
        return;
      }

      if (!value) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.setState({
        formState: formState,
      });
    } else {
      this.setError(null);
    }

    return isValid;
  }

  tokenize() {
    if (!this.hostedFieldsInstance) {
      throw new Error('Attempted to tokenize uninitialized form.');
    }

    return new Promise((resolve, reject) => {
      if (this.state.selectedCard !== null) {
        resolve(this.state.selectedCard);
      } else {
        if (!this.validateForm()) {
          const error = {
            message: 'Payment information is incorrect.'
          };
          this.setError(error);
          return reject(error);
        }

        const options = {
          vault: true,
        };
        this.hostedFieldsInstance.tokenize(options, (err, payload) => {
          if (err) {
            this.setError(err);
            return reject(err);
          }

          resolve(payload);
        });
      }
    });
  }

  onSavedCardClick(event, card) {
    event.preventDefault();

    this.setState({
      selectedCard: card,
    });
  };

  onNewPaymentMethod(event) {
    event.preventDefault();

    this.setState({
      selectedCard: null,
    })
  }

  componentDidMount() {
    if (this.braintreeInstance) {
      return;
    }

    this.braintreeInitialized = true;

    braintree.client.create({
      authorization: this.props.clientToken
    }, this.braintreeClientInit);
  }

  componentWillUnmount() {
    if (this.hostedFieldsInstance) {
      this.hostedFieldsInstance.teardown((err) => {
        console.log('Braintree teardown error:', err);
      });
    }

    this.hostedFieldsInstance = null;
  }

  render() {
    const { fieldsLoaded, cardsLoaded, error, cardType } = this.state;
    const isLoaded = fieldsLoaded && cardsLoaded;

    let cards = null;
    if (isLoaded && this.state.cards) {
      cards = this.state.cards.map(c => {
        const cardClassName = cx('list-group-item', {
          active: c === this.state.selectedCard
        })

        return (
          <a key={c.nonce} href="#" className={cardClassName} onClick={(e) => this.onSavedCardClick(e, c)}>{c.details.cardType} {c.description}</a>
        );
      });
    }

    const customClassName = cx('list-group-item', {
      active: this.state.selectedCard === null
    });

    const cardStyle = {
      display: this.state.selectedCard === null ? 'block' : 'none',
    };

    const cardTypeClassName = cx('braintree-card-type fa', {
      'fa-cc-jcb': cardType === 'jcb',
      'fa-cc-amex': cardType === 'american-express',
      'fa-cc-discover': cardType === 'discover',
      'fa-cc-mastercard': cardType === 'mastercard',
      'fa-cc-visa': cardType === 'visa',
    })

    const getFieldClass = (f) => {
      const field = this.state.formState[f];
      return cx('form-control', {
        'invalid': (typeof field !== 'undefined') && !field
      });
    };

    return (
      <div className="braintree-dropin">
        <div className="loader" style={{display: isLoaded ? 'none' : 'inline-block' }} />
        {!error ? null : (
        <div className="alert alert-danger">{error.message}</div>
         )}
        <div className="list-group" style={{display: isLoaded ? 'block': 'none' }}>
          {cards}
          <a href="#" className={customClassName} onClick={this.onNewPaymentMethod}>
            New Payment Method
          </a>
          <div className="list-group-item" style={cardStyle}>
            <div ref="container" >
              <div className="form-group">
                <label htmlFor="braintree-number">Card Number</label>
                <div id="braintree-number" className={getFieldClass('number')}>
                  {cardType && (
                   <i className={cardTypeClassName}></i>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="braintree-cvv">CVV</label>
                <div id="braintree-cvv" className={getFieldClass('cvv')}></div>
              </div>
              <div className="form-group">
                <label htmlFor="braintree-expiry">Expiration Date</label>
                <div id="braintree-expiry" className={getFieldClass('expirationDate')}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BraintreeDropIn.propTypes = {
  clientToken: React.PropTypes.string.isRequired,
};

export default BraintreeDropIn;
