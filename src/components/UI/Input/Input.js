import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let cssInput = [classes.InputElement];
   // console.log("props.valid: "+props.valid);
    //console.log("props touched: "+props.touched);
    let validationMessage=null;
    if ((!props.valid) && props.touched && props.validation) {
        cssInput.push(classes.Error)
        validationMessage=<span className={classes.ErrorMessage}>{props.validationMessage.join(', ')}</span>
    }

    let inputElement = <div>No Component to render</div>;
    switch (props.elementType) {
        case ('input-text'):
            inputElement = <div><input
                className={cssInput.join(' ')}
                type="text"
                onBlur={props.blur}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/></div>;
            break;
        case ('input-password'):
            inputElement = <div><input
                className={cssInput.join(' ')}
                type="password"
                onBlur={props.blur}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/></div>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={cssInput.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}></textarea>;
            break;
        case ('input-email'):
            inputElement = <input
                className={cssInput.join(' ')}
                type="email"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('input-phone'):
            inputElement = <input
                className={cssInput.join(' ')}
                type="tel"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={cssInput.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} className={classes.Option}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={cssInput.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationMessage}
        </div>
    );
}

export default input;
