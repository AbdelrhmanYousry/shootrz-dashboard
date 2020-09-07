import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { rootURL } from "../utils/api";
import { getCookie } from "../utils/cookie";
function getEvents() {
  const token = getCookie("shootrz-dashboard-token");

 return  axios
    .get(rootURL + "events", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => { return response.data.events});
}
export default function Events() {
  const { data, isLoading, isError } = useQuery("events", getEvents);
  if (isError) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Error while loading events
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="events-page">
      <div className="container-fluid mt-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>

              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Location</th>
              <th scope="col">Address</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((event, index) => (
              <tr key={event.id}>
                <th scope="row">{index + 1}</th>
                <td>{event.user.name}</td>
                <td>{event.user.email}</td>
                <td>{event.location.name}</td>
                <td>{event.address}</td>
                <td>{event.date}</td>
                <td>{event.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
