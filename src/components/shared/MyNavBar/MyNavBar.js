import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    const tournId = '8910';

    return (
      <div className="MyNavbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand" href="#">Traveling Disc Trip Planner</span>
        <button className="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <Link className="nav-item mr-3" to="/">View All Tournaments</Link>
            <li className="nav-item ml-3 mr-3">|</li>
            <Link className="nav-item ml-3 mr-3" to="/personal">View My Tournaments</Link>
            <li className="nav-item ml-3 mr-3">|</li>
          </ul>

          <div className="form-inline my-2 my-lg-0">
            { authed && (<button className="nav-link btn btn-danger" onClick={this.logMeOut}>Logout</button>) }
          </div>
        </div>
      </nav>
      <Link to={`/tourn/${tournId}`}></Link>
    </div>
    );
  }
}

export default MyNavbar;
