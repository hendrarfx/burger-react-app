import React from 'react'

const numericFormatted=(props) => {
    let amount=props.amount;
    let components=amount.toLocaleString(undefined, {maximumFractionDigits:2});
    return <span>{components}</span>;
}

export default numericFormatted;