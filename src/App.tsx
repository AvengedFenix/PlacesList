import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Explore from "./components/Explore";
import { createBrowserHistory } from "history";
import CreatePlace from "./components/CreatePlace";
import Navbar from "./components/Navbar";
import UserProvider from "./providers/UserProvider";
import Map from './components/Map';

const App = () => {
	// console.log(process.env);

	return (
		<UserProvider>
			<div className="App">
				<Router>
					<Navbar />
					{/* <AppNav /> */}
					<Switch>
						<Route exact path="/" component={Explore}></Route>
						<Route exact path="/createPlace" component={CreatePlace}></Route>
						<Route exact path="/maps/id=:id;lon=:lon;lat=:lat" component={Map}></Route>
					</Switch>
				</Router>
				{/* <Explore /> */}
				{/* <div className="container">
				<Place />
			</div> */}
				{/* <CreatePlace/> */}
			</div>
		</UserProvider>
	);
};

export default App;
