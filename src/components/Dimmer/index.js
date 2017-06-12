import React, { Component } from 'react';
import './Dimmer.css';

class Dimmer extends Component {
  render() {
    return (
      <div
        className={ `Dimmer${ this.props.hidden ? ' Dimmer--Hidden' : '' }` }
        onClick={ this.props.onClickDimmer }/>
    );
  }
}

export default Dimmer;
