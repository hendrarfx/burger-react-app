import React, {Component} from 'react';
import classes from './MyChart.css';
import Wrapper from '../../common/hoc/Wrapper';
import {Inputs, checkValidity, checkFormValid,getFormValueJSONObject} from '../../components/UI/Input/Inputs';
import {connect} from 'react-redux';
import * as actionType from '../../store/mychart/action';

import axios from '../../axios-config';
import WrapperWithErrorHandler from '../../common/hoc/WrapperWithErrorHandler';
import Modal from '../../components/UI/Modal/Modal';
import ConfirmationMessage from '../../components/MyChart/ConfirmationMessage';
import PurchaseList from '../../components/MyChart/PurchaseList';
import Spinner from '../../components/UI/Spinner/Spinner';

class MyChart extends Component {

    state = {
        orderForm: [
            {
                id: 'name',
                label: 'Your Name',
                config: {
                    elementType: 'input-text',
                    elementConfig: {
                        placeholder: 'Your Name'
                    },
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: ''
            }, {
                id: 'address',
                label: 'Delivery Address',
                config: {
                    elementType: 'textarea',
                    elementConfig: {
                        rows: '4',
                        placeholder: 'Address'
                    },
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: ''
            }, {
                id: 'phone',
                label: 'Phone Number',
                config: {
                    elementType: 'input-phone',
                    elementConfig: {
                        placeholder: 'Phone Number'
                    },
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: ''
            }, {
                id: 'paymentMethod',
                label: 'Payment Method',
                config: {
                    elementType: 'select',
                    elementConfig: {
                        placeholder: 'Payment Method',
                        options: [
                            {value: '', displayValue: 'Select Payment Method'},
                            {value: 'cash', displayValue: 'Cash'},
                            {value: 'debit', displayValue: 'Debit'}
                        ]
                    },
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: ''
            }
        ],
        formIsValid: false,
        loading: false,
        showConfirmOrder: false,
        initData: false,
        formValue:{}
    };



    inputChangedHandler = (event, id) => {
        let orderForm = [...this.state.orderForm];
        let selected = {...orderForm[id]};
        selected.value = event.target.value;
        checkValidity(selected);
        orderForm[id] = selected;
        let formValid = checkFormValid(orderForm);
        const formValue=getFormValueJSONObject(orderForm);
        this.setState({orderForm: orderForm, formIsValid: formValid,formValue:formValue});
    }

    orderChangeHandler = () => {
        this.setState({showConfirmOrder: true})
    }

    closeDialogConfirmation = () => {
        this.setState({showConfirmOrder: false})
    }

    componentDidMount(){
        const data = this.props.userProfile.data;
        const orderFOrms = [...this.state.orderForm];
        orderFOrms[0].value = data.name;
        orderFOrms[0].valid=true;
        orderFOrms[2].value = data.phone;
        orderFOrms[2].valid=true;
        this.setState({orderForm: orderFOrms});
    }

    componentDidUpdate() {
        if (this.props.loading === false &&
            this.props.myChart.response.status === true) {
            this.props.resetState();
            this.props.history.push({
                pathname: '/my-order'
            });
        }

    }


    render() {
        let modal = null;
        let spinner = null;
        if (this.state.showConfirmOrder === true) {
            modal = <Modal show={this.state.showConfirmOrder} closed={this.closeDialogConfirmation}>
                <ConfirmationMessage cancel={this.closeDialogConfirmation} continue={() => {
                    this.setState({showConfirmOrder: false});
                    this.props.submitMenu(this.state.formValue, this.props.myChart, this.props.token, this.props.userId);
                }}/>
            </Modal>;
        }

        if (this.props.loading) {
            spinner = <Spinner show={this.props.loading} message="Please Wait..."/>
        }

        return <div className={classes.MyChartWrapper}>
            <div align="center"><h1>MY CHART</h1></div>
            <hr/>
            <Wrapper classes={classes.MyChart}>
                {spinner}
                {modal}
                <h4>Delivery Info</h4>
                <hr/>
                <Inputs form={this.state.orderForm} changeHandler={this.inputChangedHandler}/>
                <br/>
                <PurchaseList myChart={this.props.myChart}
                              decreaseMenu={(data) => this.props.decreaseMenu(data)}
                              increaseMenu={(data) => this.props.increaseMenu(data)}
                              removeMenu={(data) => this.props.removeMenu(data)}
                />
                <br/>
                <div align="right">
                    <button className="btn btn-success" onClick={this.orderChangeHandler}
                            disabled={!this.state.formIsValid}>ORDER
                    </button>
                </div>
            </Wrapper></div>;
    }
}

const mapStateToProps = (state) => {
    return {
        myChart: state.myChart,
        loading: state.myChart.inProcessSubmit,
        token: state.auth.user.token,
        userId: state.auth.user.userId,
        userProfile: state.userProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeMenu: (value) => {
            dispatch(actionType.removeSingleMenu(value))
        },
        increaseMenu: (value) => dispatch(actionType.increaseMenu(value)),
        decreaseMenu: (value) => dispatch(actionType.decreaseMenu(value)),
        submitMenu: (orderForm, myChart, token, id) => dispatch(actionType.submitMenuToServer(orderForm, myChart, token, id)),
        resetState: () => dispatch(actionType.resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapperWithErrorHandler(MyChart, axios));