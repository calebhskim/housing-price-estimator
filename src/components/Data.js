import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AnimatedNumber from 'react-animated-number';
import DataItem from './DataItem';
import HouseMap from './HouseMap';

const dataKeys = {
  'sqft': 'Square Footage',
  'lotsqft': 'Lot Size (sqft)',
  'bedrooms': 'Number of Bedrooms',
  'totalrooms': 'Number of Total Rooms',
  'baths': 'Number of Bathrooms',
  'yearBuilt': 'Year Built',
  'useCode': 'Housing Type'
};

class Data extends Component {
  render() {
    const { address, addressData, location } = this.props;
    const estimate = !!addressData.zestimate ? Number.parseInt(addressData.zestimate['_'], 10) : '';
    return (
      <div className='data'>
        <h3>{address}</h3>
        <HouseMap location={location} />
        <div className='housedata'>
          <div className='housedataitems'>
            {Object.keys(addressData).map((key, idx) => {
              if (key in dataKeys) {
                return (
                  <DataItem key={idx} hidden={idx * 0.5} txt={`${dataKeys[key]}: ${addressData[key]}`} />
                );
              }
              
              // Don't render unwanted data points
              return <div key={idx} />;
            })}
          </div>
          <div className='houseprice'> 
            {estimate ? 
              <div className='estimate'>
                <h2>Price Estimate</h2>
                <AnimatedNumber
                  component='h2'
                  value={estimate}
                  style={{
                    transition: '0.8s ease-out',
                    fontSize: 48,
                    transitionProperty:
                        'background-color, color, opacity'
                  }}
                  frameStyle={perc => (
                      perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
                  )}
                  duration={2000}
                  formatValue={n => `${parseFloat(n).toFixed(2)} ${addressData.zestimate['$']['currency']}`}
                />
              </div> : <h2>No Estimate Found</h2>
            }
          </div>
        </div>
      </div>
    );
  }
};

Data.propTypes = {
  address: PropTypes.string,
  addressData: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  const {
    data: { addressData } 
  } = state;

  return {
    addressData,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Data);
