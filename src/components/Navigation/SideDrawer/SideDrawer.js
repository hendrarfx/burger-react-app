import React from 'react';
import Navigation from '../NavigationItem/NavigationItems';
import NavItem from '../NavigationItem/NavItem';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Wrapper from '../../../common/hoc/Wrapper';

const sideDrawer = (props) => {

    let cssDrawer = [classes.SideDrawer];
    if (props.show) {
        cssDrawer.push(classes.Open);
    } else {
        cssDrawer.push(classes.Close);
    }

    return (<Wrapper>
        <Backdrop show={props.show} closed={props.closeDrawer}/>
        <div className={cssDrawer.join(' ')}>
            <div className={classes.SideDrawerHeader}>

            </div>
            <nav>
                <Navigation>
                    <NavItem href="/"><i className="material-icons">home</i> Home</NavItem>
                    <NavItem href="/" active="true"><i className="material-icons">&#xE8CC;</i> Burger Builder</NavItem>
                    <NavItem href="/"><i className="material-icons">&#xE8B0;</i> My Order</NavItem>
                    <NavItem href="/"><i className="material-icons">&#xE879;</i> Check Out</NavItem>
                </Navigation>
            </nav>

        </div>
    </Wrapper>);
}

export default sideDrawer;