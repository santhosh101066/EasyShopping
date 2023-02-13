import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../../CSS/Aleart.css";

function PageError({ error, loadData }) {
  return (
    <div className="not-found">
      <h3>{error}</h3>{" "}
      <button onClick={loadData}>
        <FontAwesomeIcon icon={faRefresh} />
      </button>
    </div>
  );
}

export default PageError;
