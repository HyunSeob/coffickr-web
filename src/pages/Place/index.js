import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as koLocale from 'date-fns/locale/ko'
import _ from 'lodash';
import './Place.css';
import Evaluation from './Evaluation';
import Comment from './Comment';
import request from '../../request';
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
      coffee: '',
      comments: [],
      evaluations: []
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    request
      .get(`/places/${this.props.match.params.placeId}`)
      .then(res => this.setState(() => res.data));
  }

  render() {
    const additionalDetails = _(this.state.evaluations)
      .groupBy(v => v.environment.id)
      .map((evalsByEnv) => {
        const [ [ major, ] ] = _(evalsByEnv)
          .groupBy(v => v.result)
          .sortBy(v => -v.length)
          .take(1)
          .value();

        return major;
      })
      .filter(v => v.result !== 'UNKNOWN')
      .map((evaluation) => (
        <li className="Place__Detail__Item">
          <strong>{ evaluation.environment.name }</strong>
          <span>{
            (evaluation.result === 'POSITIVE')
              ? evaluation.environment.positiveLabel
              : evaluation.environment.negativeLabel
          }</span>
        </li>
      ))
      .value();

    return (
      <main className="Place">
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
          { additionalDetails }
        </ul>

        <hr className="Place__Divider" />
        <h4 className="Place__SubHeading">유저 댓글</h4>

        { this.state.comments.length ? (
          <ul className="Place__Comments">
            { this.state.comments.map(commentToListItem) }
          </ul>
        ) : <p>유저 댓글이 없습니다.</p> }

        <Link
          to={ `${this.props.match.url}/evaluation` }
          className="button Button--Primary Button--Circle FloatingButton" />

        <Route path={ `${this.props.match.url}/evaluation` } render={(props) => (
          <Evaluation
            { ...props }
            component={ Evaluation }
            placeName={ this.state.name }
            placeId={ this.state.id }
            onCreate={ this.fetchData } />
        )} />

        <Route path={ `${this.props.match.url}/comment` } render={(props) => (
          <Comment
            { ...props }
            component={ Comment }
            placeName={ this.state.name }
            placeId={ this.state.id }
            onCreate={ this.fetchData } />
        )} />
      </main>
    );
  }
}

function commentToListItem(comment) {
  return (
    <li className="Place__Comments__Item">
      <strong>
        { comment.user.name }
        <time>
          { distanceInWordsToNow(comment.updatedAt || comment.createdAt, { locale: koLocale, addSuffix: true }) }
        </time>
      </strong>
      <span>
        { comment.content }
      </span>
    </li>
  );
}

export default Place;