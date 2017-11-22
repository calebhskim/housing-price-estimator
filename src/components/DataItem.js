import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DataItem extends Component {
  componentWillMount() {
    // Supposed to fade in items, currently does not work
    setTimeout(() => {}, this.props.hidden);
  }

  render() {
    return (
      <div className='dataitem'>
        <h4>{this.props.txt}</h4>
      </div>
    );
  }
};

DataItem.propTypes = {
  hidden: PropTypes.number,
  txt: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataItem);
