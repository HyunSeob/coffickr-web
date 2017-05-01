import React, { Component } from 'react';
import axios from 'axios';
import PlaceCard from '../../components/PlaceCard';
import config from '../../config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    };
  }

  componentDidMount() {
    axios.get(`${config.serverUrl}/places`)
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

