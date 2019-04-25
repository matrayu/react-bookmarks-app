import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './BookmarkList.css';

import Bookmark from '../Bookmark/Bookmark'

class BookmarkList extends Component {
    render() {
        const bookmarks = this.props.bookmarks.map((bookmark, i) => 
            <Bookmark { ...bookmark } key={i} />);

        return(
            <div className="bookmarkList">
                {bookmarks}
            </div>
        );
    }
}

Bookmark.propTypes = {
    bookmark: PropTypes.arrayOf(PropTypes.object)
}

BookmarkList.defaultProps = {
    bookmarks: []
};

// Basic validation using some different types of methods
/* Bookmark.propTypes = {
    bookmarks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        rating: PropTypes.number,
        description: PropTypes.string
    }))
}; */

// Basic validation (same as above) but advanced validation on URL
Bookmark.propTypes = {
    title: PropTypes.string.isRequired,
    url: (props, propName, componentName) => {
        //get the value of the prop
        const prop = props[propName];

        //do the isRequired check
        if (!prop) {
            console.log('prop failed')
            return new Error (`${propName} is required in ${componentName}. Validation Failed.`);
        }

        //check type
        if (typeof prop != 'string') {
            console.log('string failed')
            return new Error (`Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`);
        }

        //do the custom check here
        //using a simple regex
        if (prop.length < 5 || !prop.match(new RegExp(/^https?:\/\//))) {
            console.log('url failed')
            return new Error (`Invalid prop, ${propName} must be a min length of 5 and begin with http(s)://. Validation Failed.`)
        }
    },
    rating: PropTypes.number,
    description: PropTypes.string
};


Bookmark.defaultProps = {
    rating: 1,
    description: ''
};

export default BookmarkList;