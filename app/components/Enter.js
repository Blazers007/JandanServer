/**
 * Created by Blazers on 2015/11/25.
 */
import React from 'react';
import EnterActions from '../actions/EnterActions';
import EnterStore from '../stores/EnterStore';

class Enter extends React.Component {

    constructor(props) {
        super(props);
        this.state = EnterStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        EnterStore.listen(this.onChange);
        $(document.body).attr('class', 'enter');
    }

    componentWillUnmount() {
        EnterStore.unlisten(this.onChange);
        $(document.body).remove('class', 'enter');
    }


    onChange(state) {
        this.setState(state);
    }

    doEnter() {
        EnterActions.submit({
            value: this.state.enterValue,
            history: this.props.history
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 enter-dialog">
                        <div id="enter-lock">
                            <img src="/img/lock.png" alt=""/>
                        </div>
                        <div id="enter-form">
                            <input type="text" onChange={EnterActions.updateUsername} value={this.state.enterValue} />
                            <button onClick={this.doEnter.bind(this)} disabled={this.state.enterDisabled}>Enter</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Enter;