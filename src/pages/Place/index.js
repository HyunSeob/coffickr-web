import React, { Component } from 'react';
import axios from 'axios';
import './Place.css';
import config from '../../config';

class Place extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      image: '',
      score: 0,
      address: '',
      phone: '000-0000-0000',
      opening: '00:00',
      closing: '23:59',
      plug: '',
      wifi: '',
      seat: '',
      crowdedness: '',
      coffee: ''
    };
  }

  componentDidMount() {
    axios.get(`${config.serverUrl}/places/${this.props.match.params.placeId}`)
      .then(res => this.setState(() => res.data));
  }

  render(match) {
    return (
      <main>
        <div
          className="Place__Cover"
          style={ { backgroundImage: this.state.image ? `url(${config.serverUrl + this.state.image})` : '' } }>
          <div className="Place__Cover__Background"></div>
          <div className="Place__Cover__Bottom">
            <h2 className="Place__Name">{ this.state.name }</h2>
            <span className="Place__Score">{ this.state.score }점</span>
          </div>
        </div>

        <ul className="Place__Detail">
          <li className="Place__Detail__Item">
            <strong>주소</strong>
            <span>{ this.state.address }</span>
          </li>
          <li className="Place__Detail__Item">
            <strong>전화번호</strong>
            <span>{ this.state.phone }</span>
          </li>
          <li className="Place__Detail__Item">
            <strong>영업시간</strong>
            <span>{ this.state.opening } - { this.state.closing }</span>
          </li>
          <li className="Place__Detail__Item">
            <strong>콘센트</strong>
            <span>{ this.state.plug }</span>
          </li>
          <li className="Place__Detail__Item">
            <strong>WIFI</strong>
            <span>{ this.state.wifi }</span>
          </li>
          <li className="Place__Detail__Item">
            <strong>좌석</strong>
            <span>{ this.state.seat }</span>
          </li>
          <li className="Place__Detail__Item">
            <strong>혼잡도</strong>
            <span>{ this.state.crowdedness }</span>
          </li>
          <li className="Place__Detail__Item">
            <strong>커피 맛</strong>
            <span>{ this.state.coffee }</span>
          </li>
        </ul>
      </main>
    );
  }
}

export default Place;