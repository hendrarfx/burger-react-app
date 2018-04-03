import React from 'react';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return (<ul className={classes.NavigationItems}>
        {props.children}
    </ul>);
}

export default navigationItems;