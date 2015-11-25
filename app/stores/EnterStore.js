/**
 * Created by Blazers on 2015/11/25.
 */
import alt from '../alt';
import EnterActions from '../actions/EnterActions'

class EnterStore {
    constructor() {
        this.bindActions(EnterActions);
        this.enterDisabled = true;
        this.enterValue = '';
    }

    onUpdateUsername(event) {
        this.enterValue = event.target.value;
        this.enterDisabled = this.enterValue.length < 6;
    }

}

export default alt.createStore(EnterStore);