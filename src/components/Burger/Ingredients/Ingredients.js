import React,{Component} from 'react';
import classes from './Ingredient.css';
import breadBottomImg from '../../../assets/burger/bread-bottom.png';
import breadTopImg from '../../../assets/burger/bread-top.png';
import meatImg from '../../../assets/burger/meat.png';
import cheeseImg from '../../../assets/burger/cheese.png';
import saladImg from '../../../assets/burger/salad.png';
import onionsImg from '../../../assets/burger/onions.png';
import picklesImg from '../../../assets/burger/pickles.png';
import tomatoImg from '../../../assets/burger/tomato.png';
import PropTypes from 'prop-types';

class Ingredients extends Component{
    render(){
        let zindex = {
            zIndex: this.props.zIndex
        }

        let ingredients = null;
        let image = null;
        let alt = '';
        let cssClass = null;
        switch (this.props.type) {
            case('bread-bottom'):
                alt = 'bread-bottom';
                image = breadBottomImg;
                cssClass = classes.BreadBottom;
                break;
            case('bread-top'):
                alt = 'bread top';
                image = breadTopImg;
                cssClass = classes.BreadTop;
                break;
            case('meat'):
                alt = 'meat';
                image = meatImg;
                cssClass = classes.Meat;
                break;
            case('cheese'):
                alt = 'cheese';
                image = cheeseImg;
                cssClass = classes.Cheese;
                break;
            case('salad'):
                alt = 'salad';
                image = saladImg;
                cssClass = classes.Salad;
                break;
            case('onions'):
                alt = 'onions';
                image = onionsImg;
                cssClass = classes.Onions;
                break;
            case('pickles'):
                alt = 'pickles';
                image = picklesImg;
                cssClass = classes.Pickles;
                break;
            case('tomato'):
                alt = 'tomato';
                image = tomatoImg;
                cssClass = classes.Tomato;
                break;
            default:
                alt = '';
                image = null;
        }
        ingredients = image != null ? <img onClick={this.props.delete} style={zindex} title={this.props.type!=='bread-bottom'|| this.props.type!=='bread-top'?'':'Click here to delete '+alt} alt={alt} className={cssClass} src={image} /> : null;
        return ingredients;
    }
}

Ingredients.propTypes={
    type:PropTypes.string.isRequired
};

export default Ingredients;