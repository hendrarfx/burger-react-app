import React from 'react';
import classes from './Wrapper.css'

const wrapper = (props) => (<div className={[props.classes,classes.Wrapper].join(' ')}><h3><b>{props.title}</b></h3><br />{props.children}</div>);

export default wrapper;