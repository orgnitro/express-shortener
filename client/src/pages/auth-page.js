import React from "react";

export function AuthPage() {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Short your link!</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter email"
                  id="email"
                  type="text"
                  className="yellow-input"
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="input-field">
              <input
                placeholder="Enter password"
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }}>
              Enter
            </button>
            <button className="btn grey lighten-1 black-text">
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
