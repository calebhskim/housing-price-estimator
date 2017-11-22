import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: props.lat, lng: props.long }}
  >
    <Marker position={{ lat: props.lat, lng: props.long }} />
  </GoogleMap>
);

class HouseMap extends Component {
  render() {
    const {
      location: { lat, lng }
    } = this.props;

    return (
      <MapComponent
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%`, width: `100%` }} />} 
        lat={lat}
        long={lng}
      />
    );
  }
};

HouseMap.propTypes = {
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HouseMap);
