import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

import { savedRecognitionsService } from "../../../services";

import "./SavedRecognitions.css";

const SavedRecognitions = () => {
  const [recognitions, setRecognitions] = useState([]);
  const userId = useSelector(state => state.authentication.user.id);

  useEffect(() => {
    const user = { id: userId };
    savedRecognitionsService.getSavedRecognitions(user).then(response => {
      setRecognitions(response);
    });
  }, [userId]);

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
      <h1>Saved recognitions</h1>
      <Table id="recognitions" striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Description</th>
            <th>Photo URL</th>
            <th>Saved</th>
          </tr>
        </thead>
        <tbody>
          {recognitions.map((recognition, index) => {
            return (
              <tr key={index}>
                <td>{recognition.description}</td>
                <td>
                  <Link to={recognition.originalPhotoUrl}>
                    {recognition.shortPhotoUrl}
                  </Link>
                </td>
                <td>{formatDate(recognition.createdTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default SavedRecognitions;
