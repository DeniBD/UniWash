import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Dashboard from "./App/Screens/Dashboard/Dashboard";
import Planificari from "./App/Screens/Planificari/Planificari";
import React from "react";
import Login from "./App/Screens/Login/Login";

function App() {
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
