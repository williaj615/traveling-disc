import React from 'react';
import tournamentData from '../../../helpers/data/tournamentData';
import Tournament from '../../shared/Tournament/Tournament';

class AllTournamentsView extends React.Component {
  state = {
    tournaments: [],

  }

  getTournaments = () => {
    tournamentData.getAllTournaments()
      .then((tournaments) => {
        this.setState({ tournaments });
      })
      .catch((err) => console.error('error on get all tournaments', err));
  }

  grassFilter = (e) => {

  }

  beachFilter = () => {

  }

  usFilter = () => {

  }

  internationalFilter = () => {

  }

  componentDidMount() {
    this.getTournaments();
  }

  render() {
    return (
      <div className="page-container">
        <h1>All Tournaments</h1>
        <div className="d-flex flex-row">
          <div className="all-tournaments-container d-flex flex-row flex-wrap justify-content-around col-10">
            {this.state.tournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament} />))}
          </div>
          <div className="filter-form col-2">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option2" onChange={this.grassFilter}></input>
              <label className="form-check-label" htmlFor="exampleRadios1">
                Show Only Grass
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onChange={this.beachFilter}></input>
              <label className="form-check-label" htmlFor="exampleRadios2">
                Show Only Beach
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option2" onChange={this.usFilter}></input>
              <label className="form-check-label" htmlFor="exampleRadios1">
                Show Only U.S
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onChange={this.internationalFilter}></input>
              <label className="form-check-label" htmlFor="exampleRadios2">
                Show Only International
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllTournamentsView;
