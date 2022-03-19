import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<Router>
         <App/>
    </Router>,
    document.querySelector("#root"))