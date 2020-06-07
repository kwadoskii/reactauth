import React from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';
import Auth from './components/Auth';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Login} />
					<Auth>
						<Route exact path='/profile' component={Profile} />
					</Auth>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;