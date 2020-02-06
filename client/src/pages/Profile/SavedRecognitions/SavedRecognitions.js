import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { savedRecognitionsService } from "../../../services";
import { getPlainLoggedInUser } from "../../../helpers";

import logoUrl from "../../../assets/images/logo.png";
import "./SavedRecognitions.css";

const SavedRecognitions = () => {
  const [recognitions, setRecognitions] = useState([]);

  useEffect(() => {
    const user = getPlainLoggedInUser();
    savedRecognitionsService.getSavedRecognitions(user).then(response => {
      setRecognitions(response);
    });
  }, []);

  const formatDate = date => {
    const dt = new Date(date);
    const DD = ("0" + dt.getDate()).slice(-2);
    const MM = ("0" + (dt.getMonth() + 1)).slice(-2);
    const YYYY = dt.getFullYear();
    const hh = ("0" + dt.getHours()).slice(-2);
    const mm = ("0" + dt.getMinutes()).slice(-2);
    const ss = ("0" + dt.getSeconds()).slice(-2);

    return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  };

  return (
    <Fragment>
      <h1 id="recognitions-heading">Saved Recognitions</h1>
      <Table
        id="recognitions"
        striped
        bordered
        hover
        responsive
        variant="light"
      >
        <thead className="thead-dark">
          <tr>
            <th>Description</th>
            <th>Photo URL</th>
            <th>Saved</th>
            <th>Recognize</th>
          </tr>
        </thead>
        <tbody>
          {recognitions.map((recognition, index) => {
            return (
              <tr key={index}>
                <td>{recognition.description}</td>
                <td>
                  <a
                    href={recognition.shortPhotoUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {recognition.shortPhotoUrl}
                  </a>
                </td>
                <td>{formatDate(recognition.createdTime)}</td>
                <td>
                  <Link to={`home/${recognition.shortCode}`}>
                    <img
                      id="recognize-icon"
                      src={logoUrl}
                      alt="Recognize icon"
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default SavedRecognitions;
