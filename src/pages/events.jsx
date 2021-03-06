import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { rootURL } from "../utils/api";
import { getCookie } from "../utils/cookie";
async function getEvents() {
  const token = getCookie("shootrz-dashboard-token");
  const response = await axios.get(rootURL + "events", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
}
export default function Events() {
  const { data, isLoading, isError } = useQuery("events", getEvents);
  let categoriesSet = {};
  let packagesSet = {};
  data && data.categories.forEach((el) => {
    categoriesSet[el.id] = el;
  });
  data && data.packages.forEach((el) => {
    packagesSet[el.id] = el;
  });
  if (isError) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        Error while loading events
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
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
              <th scope="col">Category Name</th>
              <th scope="col">Package Name</th>
              <th scope="col">Package Price</th>
              <th scope="col">Package Hours</th>
            </tr>
          </thead>
          <tbody>
            {data && data.events.map((event, index) => {
              let pack = { ...packagesSet[event.package.package_id] };
              let category = { ...categoriesSet[event.package.category_id] };
              return (
                <tr key={event.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{event.user.name}</td>
                  <td>{event.user.email}</td>
                  <td>{event.location.name}</td>
                  <td>{event.address}</td>
                  <td>{event.date}</td>
                  <td>{event.status}</td>
                  <td>{category.name}</td>
                  <td>{pack.name}</td>
                  <td>{pack.price}</td>
                  <td>{pack.hours}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
