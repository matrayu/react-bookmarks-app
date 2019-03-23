import React, { Component } from 'react';
import './Bookmark.css';

import Rating from '../Rating/Rating';

class Bookmark extends Component {
    render() {
        return(
            <div className="bookmark">
                <div className="bookmark__row">
                    <div className="bookmark__title">
                        <a href={this.props.url} target="_blank" rel="noopener noreferrer">
                            {this.props.title}
                        </a>
                    </div>
                    <Rating value={this.props.rating} />
                </div>
                <div className="bookmark__description">
                    {this.props.description}
                </div>
            </div>
        );
    }
}

export default Bookmark;