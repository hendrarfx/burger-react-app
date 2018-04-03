import React from 'react';
import classes from './NavItem.css';
import {NavLink} from 'react-router-dom';

const navItem = (props) => {
    return (
        <li className={classes.NavItem}>
            <NavLink to={props.href} exact activeClassName={classes.active}>
                <div className={classes.Middle}>{props.children}</div>
            </NavLink>
        </li>
    );
}

export default navItem;