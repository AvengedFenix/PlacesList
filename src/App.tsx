import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppNav from "./components/AppNav";
import Firebase from './services/Firebase';


function App() {
  console.log(process.env);
  
	return (
		<div className="App">
			<AppNav />
		</div>
	);
}

export default App;
