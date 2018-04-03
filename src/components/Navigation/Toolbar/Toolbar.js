import React, {Component} from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigation from '../NavigationItem/NavigationItems';
import NavItem from '../NavigationItem/NavItem';
import {connect} from 'react-redux';

class Toolbar extends Component {

    render() {
        let badge = null;

        if (this.props.myChart.totalItem > 0) {
            badge = <div className={classes.Badge}>{this.props.myChart.totalItem}</div>;
        }

        let menu = null;
        if (!this.props.auth.login) {
            menu =
                <Navigation>
                    <NavItem href="/"><i className="material-icons">home</i> Home</NavItem>
                    <NavItem href="/signin"><i className="material-icons">account_circle</i> Sign In</NavItem>
                </Navigation>
        } else {
            menu =
                <Navigation>
                    <NavItem href="/"><i className="material-icons">home</i> Home</NavItem>
                    <NavItem href="/my-order"><i className="material-icons">&#xE8B0;</i> My Order</NavItem>
                    <NavItem href="/my-chart"><i className="material-icons">&#xE8CC;</i> My Chart {badge}</NavItem>
                    <NavItem href="/signout"><i className="material-icons">exit_to_app</i> Sign Out</NavItem>
                </Navigation>
        }

        return (
            <div>
                <header className={classes.Toolbar}>
                    <div onClick={this.props.openDrawer} className={classes.MobileOnly}>
                        <div className={classes.Middle}>
                            <span style={{marginRight: '10px'}}><i className="material-icons">&#xE3C7;</i></span>
                            <span><h4>{this.props.title}</h4></span>
                        </div>
                    </div>
                    <div className={classes.MobileLogoPosition}>
                        <Logo size={'32%'}/>
                    </div>
                    <nav className={classes.DesktopOnly}>
                        {menu}
                    </nav>
                </header>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myChart: state.myChart,
        auth:state.auth
    }
}

export default connect(mapStateToProps, null, null, {pure: false})(Toolbar);