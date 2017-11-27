import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import fetchComponent from '../util/fetchComponent';
import fetchAddressData from '../actions/fetchAddressData';
import Data from './Data';
import EstimateButton from './EstimateButton';
import SearchBar from './SearchBar';
import Title from './Title';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.estimate = this.estimate.bind(this);
    this.state = {
      address: {},
    }
  }

  handleSelect(newAddress) {
    this.setState({
      address: newAddress,
    });
  }

  estimate() {
    const {
      address: { gmaps },
    } = this.state;

    const components = get(gmaps, 'address_components', []);
    const streetNumber = fetchComponent(components, 'street_number');
    const street = fetchComponent(components, 'route');
    const city = fetchComponent(components, 'locality');
    const state = fetchComponent(components, 'administrative_area_level_1');
    const zipcode = fetchComponent(components, 'postal_code');

    if (streetNumber && street && city && state  && zipcode) {
      const address = `${streetNumber} ${street}, ${city}, ${state}`;
      this.props.fetchAddressData(address, zipcode);
    }
  }

  render() {
    const { address: { label, location } } = this.state;
    const { addressData } = this.props;

    return (
      <div className='appContainer'>
        <Title />
        <SearchBar handleSelect={this.handleSelect} />
        <EstimateButton estimate={this.estimate} />
        { !isEmpty(addressData) && <Data address={label} location={location} /> }
      </div>
    );
  }
};

App.propTypes = {
  addressData: PropTypes.object,
  fetchAddressData: PropTypes.func,
};

const mapStateToProps = (state) => {
  const {
    data: { addressData }
  } = state;

  return {
    addressData,  
  };
};

const mapDispatchToProps = {
  fetchAddressData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
