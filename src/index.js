import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css"
// import semantic css for this project



ReactDOM.render(<Router>
    <App/>
</Router>,
document.querySelector("#root"))
