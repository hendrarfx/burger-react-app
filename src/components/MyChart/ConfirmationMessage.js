import React from 'react';
import classes from './ConfirmationMessage.css';
const confirmationMessage=(props)=>{
    const buttonCancel = ['btn', 'btn-danger',classes.Button].join(' ');
    const buttonContinue = ['btn', 'btn-success',classes.Button].join(' ');

    return (<div>
        <h4>Confirmation</h4>
        <hr />
        <p>Do you want to end your transaction</p>
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">

                <div className={classes.ButtonContainer}>
                    <button className={buttonCancel} onClick={props.cancel}>Cancel
                    </button>
                    <button className={buttonContinue} onClick={props.continue}>Submit</button>
                </div>
            </div>
        </div>
    </div>);
}

export default confirmationMessage;