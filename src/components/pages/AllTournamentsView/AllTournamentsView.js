import React from 'react';
import { Link } from 'react-router-dom';
import tournamentData from '../../../helpers/data/tournamentData';
import Tournament from '../../shared/Tournament/Tournament';

class AllTournamentsView extends React.Component {
  state = {
    tournaments: [],
    filteredTournaments: [],
  }

  getTournaments = () => {
    tournamentData.getAllTournaments()
      .then((tournaments) => {
        this.setState({ tournaments, filteredTournaments: tournaments });
      })
      .catch((err) => console.error('error on get all tournaments', err));
  }

  deleteATournament = (tournamentId) => {
    tournamentData.deleteTournament(tournamentId)
      .then(() => {
        this.getTournaments();
      });
  }

  addATournament = (newTournament) => {
    tournamentData.saveTournament(newTournament)
    .then(() => {
      this.getTournaments();
    })
    .catch((errOnSaveTourn) => console.error('err on save tournament', errOnSaveTourn));
  }

  grassFilter = (e) => {
    e.preventDefault();
    const grassTournaments = this.state.tournaments.filter((x) => !x.isBeach);
    this.setState({ filteredTournaments: grassTournaments });
  }

  beachFilter = (e) => {
    e.preventDefault();
    const beachTournaments = this.state.tournaments.filter((x) => x.isBeach);
    this.setState({ filteredTournaments: beachTournaments });
  }

  usFilter = (e) => {
    e.preventDefault();
    const usTournaments = this.state.tournaments.filter((x) => !x.isInternational);
    this.setState({ filteredTournaments: usTournaments });
  }

  internationalFilter = (e) => {
    e.preventDefault();
    const internationalTournaments = this.state.tournaments.filter((x) => x.isInternational);
    this.setState({ filteredTournaments: internationalTournaments });
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
            {this.state.filteredTournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament} deleteATournament={this.deleteATournament} addATournament={this.addATournament}/>))}
          </div>
          <div className="filter-form col-2">
            <Link className="btn btn-light mb-4" to="/tourn/new">Add a tournament for your team!</Link>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="grassRadios" value="option1" onChange={this.grassFilter}></input>
              <label className="form-check-label" htmlFor="grassRadios">
                Show Only Grass
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="beachRadios" value="option2" onChange={this.beachFilter}></input>
              <label className="form-check-label" htmlFor="beachRadios">
                Show Only Beach
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="usRadios" value="option3" onChange={this.usFilter}></input>
              <label className="form-check-label" htmlFor="usRadios">
                Show Only U.S
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="intlRadios" value="option4" onChange={this.internationalFilter}></input>
              <label className="form-check-label" htmlFor="intlRadios">
                Show Only International
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="exampleRadios" id="clearRadios" value="option5" onChange={this.getTournaments}></input>
              <label className="form-check-label" htmlFor="clearRadios">
                Clear Filters
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllTournamentsView;
