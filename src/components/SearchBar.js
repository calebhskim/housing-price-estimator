import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Geosuggest from 'react-geosuggest';

class SearchBar extends Component {
  render() {
    return (
      <Geosuggest
        onSuggestSelect={this.props.handleSelect}
        placeholder="1 Grand Avenue, San Luis Obispo, CA" 
      />
    );
  }
}

SearchBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  handleSelect: PropTypes.func,
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
