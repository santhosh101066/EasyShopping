import React from "react";
import "../../CSS/PageNotFound.css";
function PageNotFound(props) {
  return (
    <div className="notfound">
      <div className="notfound-box">
        <img
          src="/assets/icons/page-not-found--pink.png"
          alt="Page Not Found"
        />
        <div>
          <h1>Page Not Found</h1>
          <span>We couldn't find what you were looking for.</span>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
