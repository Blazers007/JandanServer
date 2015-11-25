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
        this.setState(state);
    }

    render() {

        let images = this.state.images.map((image, index) => {
            console.log(index);
            return (
                <li key={index}><img src={image.url}  /></li>
            )
        });
        console.log(this.state.images);

        return (
            <div>
                <ul>
                    {images}
                </ul>
            </div>
        )
    }
}

export default Image;