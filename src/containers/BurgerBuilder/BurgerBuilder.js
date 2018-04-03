import React, {Component} from 'react';
import Wrapper from '../../common/hoc/Wrapper';
import WrapperTitle from '../../common/hoc/WrapperWithTitle';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Payment from '../../components/Burger/Payment/Payment';
import Modal from '../../components/UI/Modal/Modal';
import NumericFormater from '../../common/helper/NumericFormater';
import classes from './BurgerBuilder.css'
import Spinner from '../../components/UI/Spinner/Spinner';
import * as ingActionType from '../../store/ingredients/actions';
import {connect} from 'react-redux';
import * as actionType from '../../store/mychart/action';

class BurgerBuilder extends Component {
    state = {
        purchasing: {
            order: [],
            summaryPurchasing: [],
            totalPayment: 0
        },
        order: false,
        continueProcess: false
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    onDeleteIngredients = (index) => {
        const customs = [...this.state.purchasing.order];
        customs.splice(index, 1);
        this.updatePayment(customs);
    }

    addCustomIngredients = (index) => {
        const selected = this.props.ingredients[index];
        const customs = [...this.state.purchasing.order];
        customs.push(selected.name);
        this.updatePayment(customs);
    }

    updatePayment = (customs) => {
        const basicIng = [...this.props.ingredients];
        const customIng = [...customs];
        let totalPayment = 0;
        let purchasing = [];

        if (basicIng.length > 0) {
            if (customIng.length > 0) {
                for (let a = 0; a < basicIng.length; a++) {
                    let basic = basicIng[a];
                    let data = {
                        name: basic.name,
                        price: basic.price,
                        total: 0,
                        totalPrice: 0
                    };
                    for (let b = 0; b < customIng.length; b++) {
                        let custom = customIng[b];
                        if (basic.name === custom) {
                            data.total++;
                        }
                    }
                    data.totalPrice = data.total * data.price;
                    totalPayment = totalPayment + data.totalPrice;
                    if (data.total > 0) {
                        purchasing.push(data);
                    }
                }

            }
        }

        this.setState({
            purchasing: {
                order: customs,
                summaryPurchasing: purchasing,
                totalPayment: totalPayment
            }
        });
    }

    proceedOrder = () => {
        this.setState({order: true});
    }

    cancelOrder = () => {
        this.setState({order: false});
    }

    render() {

        let modal = null;
        let spinner = null;
        if (this.state.order === true) {
            modal = <Modal show={this.state.order} closed={this.cancelOrder}>
                <Payment purchasing={this.state.purchasing}
                         cancel={this.cancelOrder}
                         continue={() => this.props.addCustomBurgerHandling(this.state.purchasing, this.props)}/>
            </Modal>;
        }
        if (this.state.continueProcess === true) {
            spinner = <Spinner show={this.state.continueProcess} message="Your order will be proceed ..."/>;
        }
        const cssButton = ['btn', 'btn-success', classes.OrderButton].join(' ');
        const totalPaymentCSS = ['col-12', 'col-sm-12', 'col-md-12', 'col-lg-12', classes.TotalPayment].join(' ');

        let panel = this.props.error ?
            <div className={classes.ErrorMessage}><h1>Cant load ingredients</h1>
            </div> : <Spinner show={true} message="Please wait ..."/>;

        if (this.props.ingredients.length > 0) {
            panel = (<Wrapper classes="row">
                {modal}
                {spinner}
                <WrapperTitle title="Custom Your Burger" classes="col-12 col-sm-12 col-md-6 col-lg-6">
                    <Controls basicIngredients={this.props.ingredients}
                              addIngredients={this.addCustomIngredients}/>
                </WrapperTitle>

                <WrapperTitle title="My Burger" classes="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className={classes.BurgerPanel}>
                        <Burger ingredients={this.state.purchasing.order} delete={this.onDeleteIngredients}/>
                    </div>
                </WrapperTitle>

                <Wrapper classes={totalPaymentCSS}>
                    <div>
                        <h3><b>Total Payment</b></h3>
                        <h3>IDR <NumericFormater amount={this.state.purchasing.totalPayment}/></h3>
                        <button
                            onClick={this.proceedOrder}
                            disabled={this.state.purchasing.totalPayment <= 0 ? true : false}
                            className={cssButton}><i
                            className="material-icons">&#xE854;</i> Add to chart
                        </button>
                    </div>
                </Wrapper>
            </Wrapper>);
        }

        return (
            <div className={classes.BurgerBuilder}>
                {panel}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients.ingredients,
        error: state.ingredients.error,
        isLogin: state.auth.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCustomBurgerHandling: (purchasing, match) => {
            dispatch(actionType.addCustomBurger(purchasing));
            match.history.push("/my-chart");
        },
        initIngredients: () => dispatch(ingActionType.getIngredientsFromServer())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);