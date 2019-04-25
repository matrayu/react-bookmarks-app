import React from 'react';
/* import PropTypes from 'prop-types'; */
import './Rating.css';

export default function Rating(props) {
    const stars = [0,0,0,0,0]
        .map((x, i) => i < props.value 
            ? <span key={i}>&#9733;</span> 
            : <span key={i}>&#9734;</span>
        );
    
    return (
        <div className="rating">
            { stars }
        </div>
    );  
}

//simple validation using built-in methods from PropTypes
/* Rating.propTypes = {
    value: PropTypes
        .oneOf([1,2,3,4,5])
        .isRequired
}; */

//custom validation method
Rating.propTypes = {
    //props is pulled from 'Rating.propTypes', propName is pulled from 'value:', and componentName is pulled from 'Ratings.propTypes'
    value: (props, propName, componentName) => {
        //first get the value of the prop
        const prop = props[propName];

        //since we want to make this required let's check that first
        if(!prop) {
            console.log('no rating');
            return new Error(`${propName} is required in ${componentName}. Validation Failed.`)
        }

        // the prop has a value let's check the type
        if(typeof prop != 'number') {
            console.log('rating should be a number');
            return new Error(`${propName} must be a number in ${componentName}. ${typeof prop} found.`)
        }

        // the prop is a number let's check the range
        if(prop < 1 || prop > 5) {
            console.log('rating needs to be 1-5');
            return new Error(`Invalid prop, ${propName} should be range 1 - 5 in ${componentName}. ${prop} found.`)
        }
    }
}

Rating.defaultProps = {
    value: 1
}