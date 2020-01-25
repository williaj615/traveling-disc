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
    theIsBeach: '',
    theIsInternational: '',
    beachCheckbox: false,
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
      theIsBeach: '',
      theIsInternational: '',
    });
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

  beachCheckHandler = (e) => {
    // const { beachCheckbox } = this.state;
    // e.preventDefault();
    if (e.target.id === 'beach-checkbox') {
      this.setState({ beachCheckbox: true });
      console.log('checked', e.target.value);
    }
  }

  internationalChange = (e) => {
    e.preventDefault();
    this.setState({ theIsInternational: e.target.value });
  }

  render() {
    return (
      <div className="form-page col-8 text-center d-flex flex-column">
        <h1 className="mt-2">New Tournament</h1>
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
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value={this.state.beachCheckbox} id="beach-checkbox" onChange={this.beachCheckHandler}/>
            <label className="form-check-label" htmlFor="beach-checkbox">
              Beach Tournament
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="intl-input" onChange={this.internationalChange}/>
            <label className="form-check-label" htmlFor="intl-input">
              International Tournament
            </label>
          </div>
        </form>
        <button className="btn btn-info" onClick={this.saveTournamentEvent}>Save</button>
        <Link className="btn btn-danger" to="/">Cancel</Link>
      </div>
    );
  }
}

export default TournamentForm;
