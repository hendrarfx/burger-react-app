import React from 'react';
import WrapperTitle from '../../../common/hoc/WrapperWithTitle';
import classes from './Payment.css';
import NumericFormater from '../../../common/helper/NumericFormater';


const payment = (props) => {
    let components = null;

    components = props.purchasing.summaryPurchasing.map((data, index) => {
        return (<div key={index} className="row">
            <div className="col-3 col-sm-3 col-md-3 col-lg-3">{data.name}</div>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3" align="center">{data.total}</div>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3"><NumericFormater amount={data.price}/></div>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3" align="right"><NumericFormater amount={(data.totalPrice)}/>
            </div>
        </div>);
    });

    const buttonCancel = ['btn', 'btn-danger', classes.ButtonCancel].join(' ');
    const buttonContinue = ['btn', 'btn-success', classes.ButtonContinue].join(' ');

    return (<WrapperTitle title="Your Order" classes={classes.Payment}>
        <p>A delicious burger with this ingredients</p>
        {components}

        <hr/>
        <div className="row">
            <div className="col-3 col-sm-3 col-md-3 col-lg-3"><b>Total</b></div>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3"></div>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3" align="right">IDR</div>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3" align="right"><NumericFormater
                amount={props.purchasing.totalPayment}/></div>
        </div>
        <br/>
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <p>Click order button to proceed your burger</p>
                <div className={classes.ButtonContainer}>
                    <button className={buttonCancel} onClick={props.cancel}>Cancel
                    </button>
                    <button className={buttonContinue} onClick={props.continue}>Order</button>
                </div>
            </div>
        </div>
    </WrapperTitle>)
}

export default payment;