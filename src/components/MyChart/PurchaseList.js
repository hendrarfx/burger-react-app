import React from 'react';
import classes from './PurchaseList.css';
import NumericFormatter from '../../common/helper/NumericFormater';

const purchaseList = (props) => {
    const col2CSS = ['col-2', 'col-sm-2', 'col-md-2', 'col-lg-2'].join(' ');
    const col1CSS = ['col-1', 'col-sm-1', 'col-md-1', 'col-lg-1'].join(' ');
    const col5CSS = ['col-5', 'col-sm-5', 'col-md-5', 'col-lg-5'].join(' ');

    let purchaseList = null;
    if (props.myChart.purchasingItem.length > 0) {
        purchaseList = props.myChart.purchasingItem.map((data, index) => {
            let description = [];
            let descriptionPanel = null;
            if (data.custom === true) {
                description = data.customDetail.summary.map((data, index) => {
                    return data.name + ' ' + (data.total);
                });
                descriptionPanel = <div style={{fontSize: 'x-small'}}>
                    <b>Description:</b> {description.join(', ')}
                </div>
            }

            const materialIconsCSS = ['material-icons', classes.AddRemoveIcon].join(' ');
            const buttonCSS = ['btn', 'btn-success', classes.AddRemoveControlButton].join(' ');

            return (<div key={index} className={['row', classes.DetailPurchasing].join(' ')}>

                <div className={col5CSS}>{data.name}<br/>{descriptionPanel}</div>
                <div className={col1CSS} style={{display: 'flex', alignItems: 'middle'}} align="center">
                    <span>{data.total}</span>
                </div>
                <div className={col2CSS} align="center">
                    <button className={buttonCSS} onClick={()=>props.increaseMenu(data.id)}><i className={materialIconsCSS}>add</i>
                    </button>
                    <button className={buttonCSS} onClick={()=>props.decreaseMenu(data.id)}><i className={materialIconsCSS}>remove</i>
                    </button>
                </div>
                <div className={col1CSS} align="right"><NumericFormatter
                    amount={data.price}/></div>
                <div className={col2CSS} align="right"><NumericFormatter
                    amount={(data.total * data.price)}/></div>
                <div className={col1CSS} align="right">
                    <button className={buttonCSS} onClick={()=>props.removeMenu(data.id)}><i className={materialIconsCSS}>close</i></button>
                </div>
            </div>);
        });
    }

    return (<div>
        <h4>Purchase List</h4>
        <hr/>
        {purchaseList}
        <div className="row" style={{margin: '1%'}}>
            <div className={col5CSS}>Total Payment</div>
            <div className={col1CSS}></div>
            <div className={col2CSS}></div>
            <div className={col1CSS} align="right">IDR</div>
            <div className={col2CSS} align="right"><NumericFormatter
                amount={props.myChart.totalPayment}/>
            </div>
            <div className={col1CSS}></div>
        </div>
    </div>);
}

export default purchaseList;