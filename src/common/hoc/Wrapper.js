import React from 'react';

const wrapper = (props) => (<div className={[props.classes].join(' ')}>{props.children}</div>);

export default wrapper;