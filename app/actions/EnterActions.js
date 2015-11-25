/**
 * Created by Blazers on 2015/11/25.
 */
import alt from '../alt';

class EnterActions {
    constructor() {
        this.generateActions(
            'updateUsername',
            'submitSuccess',
            'submitFail'
        );
    }

    submit(payload) {
        // Ajax访问服务器能否跳转 可以的话进行跳转
        console.log(payload.value);
        payload.history.pushState(null, '/bqvSgbP6G/image');
    }
}

export default alt.createActions(EnterActions);