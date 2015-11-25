import React 			from 'react';
import {Route} 			from 'react-router';
import Enter 			from './components/Enter';

import User             from './components/User'
import Image            from './components/Image';
import Joke            from './components/Joke';

export default (
	<Route>
		<Route path='/' component={Enter} />
		<Route path='/:userId' component={User}>
            <Route path='image' component={Image}/>
            <Route path='joke' component={Joke}/>
        </Route>
	</Route>
);