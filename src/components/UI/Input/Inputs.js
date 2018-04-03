import React from 'react';
import loading from '../../../assets/images/spinner.gif';
import Input from './Input';

export const Inputs = (props) => {
    let formComponent = <div><img alt="loading" src={loading}/></div>

    if (props.form.length > 0) {
        formComponent = props.form.map((formElement, index) => {
            return (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.value}
                    validation={formElement.config.validation}
                    touched={formElement.touched}
                    valid={formElement.valid}
                    validationMessage={formElement.validationMessage}
                    changed={(event) => props.changeHandler(event, index)}/>
            );
        });
    }

    return formComponent;
};

export const checkValidity = (input) => {
    const rules = input.config.validation;
    const value = input.value;
    const name = input.label;
    const type = input.config.elementType;

    let valid = {
        value: false,
        message: []
    };

    if (rules.hasOwnProperty('required')) {
        if (rules.required) {
            valid.value = value.trim('') !== '';
            if (!valid.value) valid.message.push(name + " is required");

            if (valid.value) {
                if (type === 'input-email') {
                    const pattern = /^\S+@\S+\.\S+$/;
                    valid.value = pattern.test(value.trim(' '));
                    if (!valid.value) valid.message.push(name + ' format is not valid, ex: xxx@sample.com');
                }

                if (type === 'input-phone') {
                    const pattern = /^[0-9]{1,}[0-9]{3,15}$/;
                    valid.value = pattern.test(value.trim(' '));
                    if (valid.value) valid.value = value.length >= 9 && value.length <= 15;
                    if (!valid.value) valid.message.push(name + ' format is not valid, ex: +6282199998888 or 082199998888');
                }
            }
        }
    }

    if (rules.hasOwnProperty('pattern') && valid.value) {
        const pattern = rules.pattern;
        valid.value = pattern.test(value.trim(' '));
        if (!valid.value) valid.message.push(name + ' format is not valid');
    }

    if (rules.hasOwnProperty('minlength') && valid.value) {
        valid.value = value.length >= rules.minlength;
        if (!valid.value) valid.message.push('Min length of ' + name + ' is ' + rules.minlength);
    }

    if (rules.hasOwnProperty('maxlength') && valid.value) {
        valid.value = value.length <= rules.maxlength;
        if (!valid.value) valid.message.push('Max length of ' + name + 'is ' + rules.maxlength);
    }

    input.valid = valid.value;
    input.validationMessage = [...valid.message];
    input.touched = true;
};

export const checkFormValid = (forms) => {
    let formValid = false;
    for (let a = 0; a < forms.length; a++) {
        if (forms[a].valid) {
            formValid = true;
        } else {
            formValid = false;
            break;
        }
    }
    return formValid;
};

export const getFormValueJSONObject = (forms) => {
    let formObject = [];
    for (let a = 0; a < forms.length; a++) {
        const object = forms[a];
        formObject.push('"' + object.id + '":"' + object.value + '"');
    }
    const stringObj = '{' + formObject.join(',') + '}';
    const formValueObject = JSON.parse(stringObj);
    return formValueObject;
}