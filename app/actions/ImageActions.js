/**
 * Created by Blazers on 2015/11/25.
 */
import alt from '../alt';

class ImageActions {
    constructor() {
        this.generateActions(
            'loadImageSuccess',
            'loadImageFail'
        );
    }

    loadImages(userId) {
        $.ajax({url: '/api/'+userId+'/image'})
            .done((data) => this.actions.loadImageSuccess(data))
            .fail((jqXhr) => this.actions.loadImageFail(jqXhr));
    }

}

export default alt.createActions(ImageActions);