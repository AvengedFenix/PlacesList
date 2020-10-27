import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppNav from "./components/AppNav";
// import Firebase from './services/Firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import Explore from "./components/Explore";
import { createBrowserHistory } from "history";
import CreatePlace from "./components/CreatePlace";
import Place from "./components/Place";
import Navbar from './components/Navbar';

const history = createBrowserHistory();

const App = () => {
	// console.log(process.env);

	return (
		<div className="App">
			<Router>
				<Navbar />
				{/* <AppNav /> */}
				<Switch>
					<Route exact path="/" component={Explore}></Route>
					<Route exact path="/createPlace" component={CreatePlace}></Route>
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
