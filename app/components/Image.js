/**
 * Created by Blazers on 2015/11/25.
 */
import React from 'react';
import ImageActions from '../actions/ImageActions';
import ImageStore from '../stores/ImageStore';

class Image extends React.Component {

    constructor(props) {
        super(props);
        this.state = ImageStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ImageStore.listen(this.onChange);
        ImageActions.loadImages(this.props.params.userId);
    }

    componentWillUnmount() {
        ImageStore.unlisten(this.onChange);
    }

    onChange(state) {
        console.log('OnChange start');
        this.setState(state);
        console.log('Set State');
    }

    componentDidUpdate(pervProps) {
        var $container = $('.masonry-container');
        $container.imagesLoaded(function (instance) {
            // 添加大小属性
            let index = 0;
            for (let image of instance.images) {
                image.img.setAttribute('w', image.img.naturalWidth);
                image.img.setAttribute('h', image.img.naturalHeight);
                image.img.setAttribute('data-pswp-uid', index++);
            }
            // 初始化Masonry控件
            $container.masonry({
                columnWidth: '.masonry-card',
                itemSelector: '.masonry-card'
            });
        });

        let images = $('.image-card img');
        images.each((index) => {
            $(images[index]).click(()=>{
                let pswpElement = document.querySelectorAll('.pswp')[0];
                var images = $('.image-card img');
                var items = [];
                for (let i = 0 ; i < images.length; i ++) {
                    items[i] = {
                        msrc: images[i].getAttribute('src'),
                        src: images[i].getAttribute('src'),
                        w: images[i].getAttribute('w'),
                        h: images[i].getAttribute('h')
                    }
                }
                var options = {
                    galleryUID: index,
                    index: index,
                    getThumbBoundsFn: (i) => {
                        let thumbnail = document.querySelectorAll('.image-card img')[i];
                        var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        var rect = thumbnail.getBoundingClientRect();
                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }
                };
                var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            })
        });
    }


    render() {
        let images = this.state.images.map((image, index) => {
            return (
                <div key={index} className="masonry-card col-lg-2 col-md-3 col-sm-4 col-xs-6">
                    <div className="image-card card">
                        <img src={image.url} className="img-responsive"/>
                        <h4>{image.favTime}</h4>
                    </div>
                </div>
            )
        });

        return (
            <div className="container-fluid">
                <div className="row masonry-container">
                    {images}
                </div>
            </div>
        )
    }
}

export default Image;