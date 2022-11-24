import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import AddEvents from "./components/agenda/form/AddEvents";
import MyCalendar from "./components/agenda/list/Calendar";
import "./style/global.scss";

function App() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid align-items-center">
          <Link className="navbar-brand ms-2" to="/">
            <h3>Agenda-App</h3>
          </Link>
          <span className="navbar-brand mb-0 h2 ">
            <Link className="nav-link pe-0 " to={"/events/add"}>
              Create Event
            </Link>
          </span>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<MyCalendar />} />
        <Route path="/events/add" element={<AddEvents />} />
      </Routes>
    </>
  );
}

export default App;
