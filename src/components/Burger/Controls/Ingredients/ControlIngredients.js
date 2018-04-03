import React,{Component} from 'react';
import classes from './ControlIngredients.css';
import Wrapper from '../../../../common/hoc/Wrapper';
import NumericHelper from '../../../../common/helper/NumericFormater';
import PropTypes from 'prop-types';

class ControlIngredients extends Component{
    render(){
        let image = null;

        switch (this.props.object.name) {
            case('meat'):
                image = <img alt="meat" src={require('../../../../assets/burger/meat.png')}/>;
                break;
            case('cheese'):
                image = <img alt="cheese" src={require('../../../../assets/burger/cheese.png')}/>;
                break;
            case('salad'):
                image = <img alt="salad" src={require('../../../../assets/burger/salad.png')}/>;
                break;
            case('onions'):
                image = <img alt="onions" src={require('../../../../assets/burger/onions.png')}/>;
                break;
            case('pickles'):
                image = <img alt="pickles" src={require('../../../../assets/burger/pickles.png')}/>;
                break;
            case('tomato'):
                image = <img alt="tomato" src={require('../../../../assets/burger/tomato.png')}/>;
                break;
            default:
                image = null;
        }

        let controls = null;
        const css = ['row', classes.controlIngredients].join(' ');

        if (image != null) {
            controls = <Wrapper classes={css}>
                <div className="col-sm-3 col-md-4 col-lg-4">
                    <h5>{this.props.object.name}</h5>
                </div>
                <div className="col-sm-3 col-md-4 col-lg-4">
                    {image}
                </div>
                <div className="col-sm-3 col-md-2 col-lg-2">
                    <NumericHelper amount={this.props.object.price} />
                </div>
                <div className="col-sm-3 col-md-2 col-lg-2">
                    <button className="btn btn-success" onClick={this.props.addIngredients}>ADD</button>
                </div>
            </Wrapper>;
        }
        return controls;
    }
}

ControlIngredients.propTypes={
    object: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
};


export default ControlIngredients;