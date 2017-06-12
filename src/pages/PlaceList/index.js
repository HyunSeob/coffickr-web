import * as queryString from 'query-string';
import React, { Component } from 'react';
import PlaceCard from '../../components/PlaceCard';
import config from '../../config';
import request from '../../request';
import chunk from 'lodash/chunk';
import './PlaceList.css';

class PlaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      places: [],
      isLastPage: false,
    };

    this.fetchPlaces = this.fetchPlaces.bind(this);
  }

  componentDidMount() {
    this.fetchPlaces();
  }

  fetchPlaces() {
    const { q } = queryString.parse(this.props.location.search);
    const query = queryString.stringify({ q, page: this.state.page });

    request
      .get(`/places?${query}`)
      .then(res => this.setState(() => ({
        places: this.state.places.concat(res.data),
        page: this.state.page + 1,
        isLastPage: res.data.length === 0
      })));
  }

  render() {
    return (
      <main>
        {
          chunk(this.state.places, 4)
            .map(chunked => (
              <div className="row">
                { chunked.map(place => (
                  <PlaceCard
                    key={ place.id }
                    name={ place.name }
                    to={ `/places/${place.id}` }
                    image={ place.photoRef ? `${config.serverUrl}/places/${place.id}/photo` : `${config.serverUrl}/image/default.jpg` }
                    score={ place.score } />
                )) }
              </div>
            ))
        }
        {
          this.state.isLastPage ? '' : (
            <div className="row">
              <button
                type="button"
                className="Button Button--Primary Button--Large LoadButton"
                onClick={ this.fetchPlaces }>
                더 불러오기
              </button>
            </div>
          )
        }
      </main>
    );
  }
}

export default PlaceList;

