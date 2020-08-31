import React, { Component } from 'react';

import './Search-Panel.css';

export default class SearchPanel extends Component {

  state = {
    inputValue: ''
  }

  onChangeInput = (e) => {
    const inputValue = e.target.value
    this.setState({ inputValue });
    this.props.onSearchChange(inputValue)
  }

  render () {
    const searchText = 'Type here to search';
    return <input type="text"
      className="form-control search-input"
      placeholder={searchText}
      onChange={this.onChangeInput} 
      value={this.state.inputValue}/>;
  }
}
