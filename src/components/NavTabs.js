import React from "react";

function NavTabs(props) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a
          href="#home"
          onClick={() => props.handlePageChange("Home")}
          className={props.currentPage === "Home" ? "nav-link active" : "nav-link"}
        >
          Clicky Game
        </a>
      </li>
      <li className="nav-item">
          Click an Image to Begin! 
      </li>
      <li className="nav-item">
          Score:  | Top Score: 
      </li>
    </ul>
  );
}

export default NavTabs;
