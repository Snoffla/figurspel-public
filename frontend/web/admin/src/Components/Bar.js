import React from 'react';

function NavBar(props) {
  return (
      <nav className="navbar navbar-lg navbar-light bg-white p-2 m-2 shadow-sm rounded navbar-expand-sm">
        <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 justify-content-center">
              {props.children}
            </ul>
          </div>
        </div>
      </nav>
  );
}
  
export default NavBar;


