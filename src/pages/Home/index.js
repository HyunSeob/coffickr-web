import React, { Component } from 'react';
import PlaceCard from '../../components/PlaceCard';
import config from '../../config';
import request from '../../request';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    };
  }

  componentDidMount() {
    request.get('/places')
      .then(res => this.setState(() => ({ places: res.data })));
  }

  render() {
    return (
      <main className="row">
        { this.state.places.map(place => (
          <PlaceCard
            key={ place.id }
            name={ place.name }
            to={ `/places/${place.id}` }
            image={ config.serverUrl + place.image }
            score={ place.score } />
        )) }
      </main>
    );
  }
}

export default Home;

