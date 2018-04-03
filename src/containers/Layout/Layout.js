import React, {Component} from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import AppRouter from '../AppRouter';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionType from '../../store/auth/actions';

class Layout extends Component {

    state = {
        sideDrawerOpen: false
    };

    openSideDrawer = () => {
        this.setState({sideDrawerOpen: true});
    }

    closeSideDrawer = () => {
        this.setState({sideDrawerOpen: false});
    }

    componentWillMount(){
        this.props.checkState();
    }

    render() {
        return (
            <div>
                <Toolbar openDrawer={this.openSideDrawer} title={'Burger Builder'}/>
                <SideDrawer show={this.state.sideDrawerOpen} closeDrawer={this.closeSideDrawer}/>
                <main className={classes.content}>
                    <AppRouter isLogin={this.props.isLogin} currentPath={this.props.location.pathname} />
                    {this.props.children}
                </main>
            </div>);
    }
}

const mapsStateToProps = (state) => {
    return {
        isLogin: state.auth.login
    };
}

const mapDispatchToProps=(dispatch)=>{
    return {
        checkState: ()=>dispatch(actionType.checkStateFromLocalStorage())
    }
};

export default withRouter(connect(mapsStateToProps,mapDispatchToProps)(Layout));