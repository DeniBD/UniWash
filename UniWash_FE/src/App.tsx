import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Dashboard from "./App/Screens/Dashboard/Dashboard";
import Planificari from "./App/Screens/Planificari/Planificari";
import React, { useEffect } from "react";
import Login from "./App/Screens/Login/Login";
import {gapi} from 'gapi-script';

const clientId = "21799809046-p643b3dhbgpbqsfrujgp23vndshpu4so.apps.googleusercontent.com";

function App() {
	useEffect(() => {
		function start() {
	
		gapi.client.init({
			clientId: clientId,
			scope: '',
		})
	};

	gapi.load('client:auth2', start);
	});

  	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Login/>} />
					<Route path="/dashboard" element={<Dashboard />} />

					<Route path="/planificari" element={<Planificari />} />

					<Route path="*" element={<Navigate to="/dashboard" />} />
				</Routes>
			</Router>
		</>
  	);
}

export default App;
