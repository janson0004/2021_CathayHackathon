import logo from "./logo.svg";
import React, { useState, useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import Home from "./views/Home";

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
