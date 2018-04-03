import React from 'react';
import classes from './Burger.css';
import Ingredients from './Ingredients/Ingredients';

const burger = (props) => {

    let customIngredients=null;
    const totalIngredients=props.ingredients.length;
    if(totalIngredients > 0){
        customIngredients = (<div>
            {
                props.ingredients.map((ingredients, index) => {
                return <Ingredients key={index} delete={()=>props.delete(index)}
                type={ingredients} zIndex={totalIngredients - index}/>
            })
            }</div>);
    } else {
        customIngredients=<div className={classes.zeroIngredients}>Please add any ingredients</div>
    }

    return (
        <div className={classes.burger}>
            <Ingredients type="bread-top" zIndex={0}/>
            {customIngredients}
            <Ingredients type="bread-bottom" zIndex={0}/>
        </div>
    );
}

export default burger;