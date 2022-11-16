import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>


            <nav className="navbar navbar-expand-lg bg-dark" style={{ position: 'fixed', width: '100%', top: '0' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{ color: 'white' }}>
                        Foodspot
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse me-auto" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">

                                <Link className="nav-link active" aria-current="page" to="/" style={{ color: 'white' }}>
                                    home
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/video" style={{ color: 'white' }}>
                                    video
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/predict" style={{ color: 'white' }}>
                                    predict
                                </Link>
                            </li>
                            <li className="nav-item">

                                <Link className="nav-link active" aria-current="page" to="/story" style={{ color: 'white' }}>
                                    Our Story
                                </Link>
                            </li>
                            <li className="nav-item">

                                <Link className="nav-link active" aria-current="page" to="/" style={{ color: 'white' }}>
                                    FAQ                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Navbar;
