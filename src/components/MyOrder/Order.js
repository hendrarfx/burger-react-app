import React, {Component} from 'react';
import classes from './Order.css';
import Moment from 'react-moment';
import NumericFormatter from '../../common/helper/NumericFormater';

class Order extends Component {

    state = {open: false};

    render() {
        const data = this.props.order;
        const purchasingItem = data.purchasingItem.map((item, index) => {
            return <li key={index}>{item.name} ({item.total})</li>;
        });
        return (<div className={classes.Order}>
            <div className={classes.Title}>Order Date: <Moment date={data.id} format="DD MMM YYYY HH:mm"/></div>
            Total Payment: <NumericFormatter amount={data.totalPayment}/><br/>
            Purchase Item<br/>
            {purchasingItem}<br />
           {/* <div align="right">
                <div className={classes.Button}> Show Payment Detail</div>
            </div>*/}
        </div>)
    }
}

export default Order;