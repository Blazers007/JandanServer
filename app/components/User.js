/**
 * Created by Blazers on 2015/11/25.
 */
import React from 'react';

class User extends React.Component {

    render() {
        return (
            <div>
                nav
                {this.props.children}
            </div>
        )
    }
}

export default User;