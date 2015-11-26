/**
 * Created by Blazers on 2015/11/25.
 */
import React from 'react';

import UserNavbar from './UserNavbar';

class User extends React.Component {

    render() {
        return (
            <div>
                <UserNavbar/>
                {this.props.children}
            </div>
        )
    }
}

export default User;