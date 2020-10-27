import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Explore from "./components/Explore";
import { createBrowserHistory } from "history";
import CreatePlace from "./components/CreatePlace";
import Navbar from "./components/Navbar";
import UserProvider from "./providers/UserProvider";

const history = createBrowserHistory();

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
