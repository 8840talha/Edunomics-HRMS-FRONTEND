import React from "react";
import { Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom" className="footer">
      <Navbar.Brand className="ml-auto mr-auto footer">
        <a
          className="footer-link"
          href="https://edunomics.in/"
          target="__blank"
        >
          Edunomics
        </a>{" "}
        <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>©</span>{" "}
        {new Date().getFullYear()}
      </Navbar.Brand>
    </Navbar>
  );
}

export default Header;
