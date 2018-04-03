import React from 'react';
import Ingredients from './Ingredients/ControlIngredients';
import classes from './Controls.css';

const controls = (props) => {

    let customControls = null;
    customControls = (<div>
        {
            props.basicIngredients.map((ingredients, index) => {
                return <Ingredients key={index} object={ingredients} addIngredients={()=>props.addIngredients(index)} />
            })
        }</div>);

    return (
        <div className={classes.controls}>
            {customControls}
        </div>
    );

};

export default controls;