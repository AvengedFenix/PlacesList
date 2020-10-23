import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppNav from "./components/AppNav";
// import Firebase from './services/Firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Router, Link } from "react-router-dom";
import Explore from "./components/Explore";
import { createBrowserHistory } from "history";
import CreatePlace from "./components/CreatePlace";
import Place from "./components/Place";

const history = createBrowserHistory();

const App = () => {
	// console.log(process.env);

	return (
		<div className="App">
			<Router history={history}>
				<AppNav />
				<Switch>
					<Route path="/">
						<Explore />
					</Route>
					<Route path="/createPlace">
						<CreatePlace />
					</Route>
				</Switch>
			</Router>
			{/* <Explore /> */}
			{/* <div className="container">
				<Place />
			</div> */}
			{/* <CreatePlace/> */}
		</div>
	);
};

export default App;
