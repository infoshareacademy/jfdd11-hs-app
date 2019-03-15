import React, { Component } from "react";
import { withAdvancedSearch } from "../../contexts/AdvancedSearch/AdvancedSearch";
import firebase from "firebase";
import "./MyPubs.css";
class MyPubs extends Component {
  getUser = res =>
    this.props.advancedSearchContext.users.find(user => user.id === res.userUid)
      .name;

  changeReservationState = ajdi => {
    console.log(
      firebase
        .database()
        .ref("reservations")
        .child(`${ajdi}`)
    );
  };

  render() {
    const {
      publist,
      reservations,
      updateState
    } = this.props.advancedSearchContext;
    const { user } = this.props;
    let myPubList = publist.filter(pub => pub.owner === user.id);
    return (
      <div className="MyPubs">
        <ul>
          {myPubList.map(pub => (
            <li key="firebaseId1">
              <div className="MyPubs-pub">
                <h2 className="MyPubs-pubname">
                  {pub.name} <span>reservations:</span>
                </h2>
                <ul>
                  {reservations.map(reservation => (
                    <li key={reservation.id} className="MyPubs-reservation-li">
                      <div className="MyPubs-reservation">
                        <h3 className="MyPubs-userName">
                          {this.getUser(reservation)}
                        </h3>
                        <button
                          className="MyPubs-btn MyPubs-btn-reject"
                          onClick={() =>
                            updateState(reservation.id, "rejected")
                          }
                        >
                          Reject
                        </button>
                        <button
                          className={
                            `MyPubs-btn MyPubs-btn-accept ` +
                              reservation.status !==
                            "pending"
                              ? "MyPubs-btn-inactive"
                              : ""
                          }
                          onClick={() =>
                            updateState(reservation.id, "accepted")
                          }
                        >
                          Accept
                        </button>
                        <p className="MyPubs-date">
                          {new Date(reservation.date).toDateString()}
                        </p>
                      </div>
                    </li>
                  ))}

                  <li key="reserv-key2" className="MyPubs-reservation-li">
                    <div className="MyPubs-reservation">
                      <h3 className="MyPubs-userName">user name</h3>
                      <button className="MyPubs-btn MyPubs-btn-reject">
                        Reject
                      </button>
                      <button className="MyPubs-btn MyPubs-btn-accept">
                        Accept
                      </button>

                      <p className="MyPubs-date">date and hour</p>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withAdvancedSearch(MyPubs);
