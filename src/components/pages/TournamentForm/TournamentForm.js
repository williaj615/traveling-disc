import React from 'react';
import { Link } from 'react-router-dom';
import './TournamentForm.scss';
import authData from '../../../helpers/data/authData';
import tournamentData from '../../../helpers/data/tournamentData';

class TournamentForm extends React.Component {
  state = {
    theName: '',
    theStartDate: '',
    theEndDate: '',
    theBidFee: '',
    theRegLink: '',
    theIsBeach: false,
    theIsInternational: false,
  }

  componentDidMount() {
    const { tournId } = this.props.match.params;
    if (tournId) {
      tournamentData.getSingleTournament(tournId)
        .then((response) => {
          this.setState({
            theName: response.data.name,
            theStartDate: response.data.startDate,
            theEndDate: response.data.endDate,
            theBidFee: response.data.bidFee,
            theRegLink: response.data.registrationLink,
            theIsBeach: response.data.isBeach,
            theIsInternational: response.data.isInternational,
          });
        })
        .catch((err) => console.error('error in get single tourn', err));
    }
  }

  saveTournamentEvent = (e) => {
    const currentUser = authData.getUid();
    const newTournament = {
      name: this.state.theName,
      startDate: this.state.theStartDate,
      endDate: this.state.theEndDate,
      bidFee: this.state.theBidFee,
      registrationLink: this.state.theRegLink,
      isBeach: this.state.theIsBeach,
      isInternational: this.state.theIsInternational,
      uid: currentUser,
    };
    tournamentData.saveTournament(newTournament)
      .then(() => {
        this.props.history.push('/');
      })
      .catch((errOnSaveTourn) => console.error('err on save tournament', errOnSaveTourn));
    this.setState({
      theName: '',
      theStartDate: '',
      theEndDate: '',
      theBidFee: '',
      theRegLink: '',
      theIsBeach: null,
      theIsInternational: null,
    });
  }

  updateTournamentEvent = (e) => {
    e.preventDefault();
    const currentUser = authData.getUid();
    const { tournId } = this.props.match.params;
    const updatedTournament = {
      name: this.state.theName,
      startDate: this.state.theStartDate,
      endDate: this.state.theEndDate,
      bidFee: this.state.theBidFee,
      registrationLink: this.state.theRegLink,
      isBeach: this.state.theIsBeach,
      isInternational: this.state.theIsInternational,
      uid: currentUser,
    };
    tournamentData.updateTournament(tournId, updatedTournament)
      .then(() => {
        this.props.history.push('/');
      })
      .catch((errOnUpdateTourn) => console.error('err on update tournament', errOnUpdateTourn));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ theName: e.target.value });
  }

  startChange = (e) => {
    e.preventDefault();
    this.setState({ theStartDate: e.target.value });
  }

  endChange = (e) => {
    e.preventDefault();
    this.setState({ theEndDate: e.target.value });
  }

  bidChange = (e) => {
    e.preventDefault();
    this.setState({ theBidFee: e.target.value });
  }

  regChange = (e) => {
    e.preventDefault();
    this.setState({ theRegLink: e.target.value });
  }

  beachChange = (e) => {
    this.setState((prevState) => ({
      theIsBeach: !prevState.theIsBeach,
    }));
  }

  internationalChange = (e) => {
    this.setState((prevState) => ({
      theIsInternational: !prevState.theIsInternational,
    }));
  }

  render() {
    const { tournId } = this.props.match.params;
    const { theIsBeach } = this.state;
    const { theIsInternational } = this.state;
    return (
      <div className="form-page text-center d-flex flex-column">
        <h1 className="mt-2">Tournament Details</h1>
        <form className="">
          <div className="form-group">
            <label htmlFor="name-input">Name</label>
            <input type="text" className="form-control" id="name-input" placeholder="Enter tournament name" value={this.state.theName} onChange={this.nameChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="start-input">Start Date</label>
            <input type="text" className="form-control" id="start-input" placeholder="Enter tournament Start Date" value={this.state.theStartDate} onChange={this.startChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="end-input">End Date</label>
            <input type="text" className="form-control" id="end-input" placeholder="Enter tournament End Date" value={this.state.theEndDate} onChange={this.endChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="bid-fee-input">Bid Fee</label>
            <input type="text" className="form-control" id="bid-fee-input" placeholder="Enter tournament bid fee" value={this.state.theBidFee} onChange={this.bidChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="registration-input">Registration Link</label>
            <input type="text" className="form-control" id="registration-input" placeholder="Enter tournament registration link" value={this.state.theRegLink} onChange={this.regChange}/>
          </div>
          <div className="checkbox-holder">
          { theIsBeach
            ? <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="beach-checkbox" onChange={this.beachChange} checked/>
                <label className="form-check-label" htmlFor="beach-checkbox">
                  Beach Tournament
                </label>
              </div>
            : <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="beach-checkbox" onChange={this.beachChange}/>
                <label className="form-check-label" htmlFor="beach-checkbox">
                  Beach Tournament
                </label>
              </div>
          }
          </div>
          <div className="checkbox-holder">
          { theIsInternational
            ? <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="intl-input" onChange={this.internationalChange} checked/>
              <label className="form-check-label" htmlFor="intl-input">
                International Tournament
              </label>
            </div>
            : <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="intl-input" onChange={this.internationalChange}/>
              <label className="form-check-label" htmlFor="intl-input">
                International Tournament
              </label>
            </div>
          }
          </div>
        </form>
        { tournId
          ? <button className="btn btn-warning" onClick={this.updateTournamentEvent}>Update</button>
          : <button className="btn btn-secondary" onClick={this.saveTournamentEvent}>Save</button>
        }
        <Link className="btn btn-danger" to="/">Cancel</Link>
      </div>
    );
  }
}

export default TournamentForm;
