import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import get from 'lodash/get';

import fetchComponent from '../util/fetchComponent';
import fetchAddressData from '../actions/fetchAddressData';
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
    console.log(newAddress);
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
    return (
      <div className='appContainer'>
        <Title />
        <SearchBar handleSelect={this.handleSelect} />
        <EstimateButton estimate={this.estimate} />
      </div>
    );
  }
};

App.propTypes = {
  fetchAddressData: PropTypes.func,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  fetchAddressData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
