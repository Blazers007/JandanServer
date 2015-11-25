/**
 * Created by Blazers on 2015/11/25.
 */
import alt from '../alt';
import ImageActions from '../actions/ImageActions'

class ImageStore {
    constructor() {
        this.bindActions(ImageActions);
        this.images = [];
        this.page = 1;
    }

    onLoadImageSuccess(data) {
        console.log('Success');
        this.page ++ ;
        this.images.push.apply(this.images, data); // 组合两个数组
    }

    onLoadImageFail(jqXhr) {

    }
}

export default alt.createStore(ImageStore);