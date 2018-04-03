import React from 'react';
import Order from './Order';

const orders = (props) => {
    const panel = props.data.map((data, index) => {
        return (<Order key={data.id} order={data}/>);
    });
    return (<div>
        {panel}
    </div>)
};

export default orders;