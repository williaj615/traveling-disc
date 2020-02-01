import React from 'react';
import { Link } from 'react-router-dom';
import tournamentData from '../../../helpers/data/tournamentData';
import Tournament from '../../shared/Tournament/Tournament';
import playerData from '../../../helpers/data/playerData';
import './AllTournamentsView.scss';

class AllTournamentsView extends React.Component {
  state = {
    tournaments: [],
    filteredTournaments: [],

  }

  saveAPlayer = (newPlayer) => {
    playerData.savePlayer(newPlayer)
      .then(() => {
        this.toggle();
      })
      .catch((errOnSavePlayer) => console.error('err on save tournament', errOnSavePlayer));
    this.setState({
      modal: false,
      newPlayerName: '',
      newPlayerUid: '',
      newPlayerTournamentId: '',
      newPlayerStatus: '',
    });
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

  grassFilter = (e) => {
    const grassTournaments = this.state.tournaments.filter((x) => !x.isBeach);
    this.setState({ filteredTournaments: grassTournaments });
  }

  beachFilter = (e) => {
    const beachTournaments = this.state.tournaments.filter((x) => x.isBeach);
    this.setState({ filteredTournaments: beachTournaments });
  }

  usFilter = (e) => {
    const usTournaments = this.state.tournaments.filter((x) => !x.isInternational);
    this.setState({ filteredTournaments: usTournaments });
  }

  internationalFilter = (e) => {
    const internationalTournaments = this.state.tournaments.filter((x) => x.isInternational);
    this.setState({ filteredTournaments: internationalTournaments });
  }

  componentDidMount() {
    this.getTournaments();
  }

  render() {
    const { updateAPlayer } = this.props;
    return (
      <div className="all-page-container">
        <h1 className="mb-4">All Tournaments</h1>
        <div className="d-flex flex-row">
          <div className="all-tournaments-container d-flex flex-row flex-wrap justify-content-around col-9">
            {this.state.filteredTournaments.map((tournament) => (<Tournament key={tournament.id} tournament={tournament} deleteATournament={this.deleteATournament} saveAPlayer={this.saveAPlayer} updateAPlayer={updateAPlayer}/>))}
          </div>
          <div className="filter-form col-3 mt-3">
            <div className="second-component-holder">
            <Link className="btn btn-light mb-4" to="/tourn/new">Add a tournament for your team!</Link>
            <div className="form-check mt-2 mb-2">
              <input className="form-check-input" type="radio" name="exampleRadios" id="grassRadios" value="option1" onChange={this.grassFilter}></input>
              <label className="form-check-label" htmlFor="grassRadios">
                Show Only Grass
              </label>
            </div>
            <div className="form-check mt-2 mb-2">
              <input className="form-check-input" type="radio" name="exampleRadios" id="beachRadios" value="option2" onChange={this.beachFilter}></input>
              <label className="form-check-label" htmlFor="beachRadios">
                Show Only Beach
              </label>
            </div>
            <div className="form-check mt-2 mb-2">
              <input className="form-check-input" type="radio" name="exampleRadios" id="usRadios" value="option3" onChange={this.usFilter}></input>
              <label className="form-check-label" htmlFor="usRadios">
                Show Only U.S
              </label>
            </div>
            <div className="form-check mt-2 mb-2">
              <input className="form-check-input" type="radio" name="exampleRadios" id="intlRadios" value="option4" onChange={this.internationalFilter}></input>
              <label className="form-check-label" htmlFor="intlRadios">
                Show Only International
              </label>
            </div>
            <div className="form-check mt-2">
              <input className="form-check-input" type="radio" name="exampleRadios" id="clearRadios" value="option5" onChange={this.getTournaments}></input>
              <label className="form-check-label" htmlFor="clearRadios">
                Clear Filters
              </label>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllTournamentsView;
