import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EstimateButton extends Component {
  render() {
    return (
      <a
        className='button'
        onClick={() => {
          this.props.estimate();
        }}
      >
        Estimate
      </a>
    );
  }
}

EstimateButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  estimate: PropTypes.func,
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EstimateButton);
