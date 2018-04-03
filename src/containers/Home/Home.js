import React, {Component} from 'react';
import Wrapper from '../../common/hoc/Wrapper';
import classes from './Home.css';
import Logo from '../../components/Logo/Logo';
import loading from '../../assets/images/spinner.gif';
import Menus from '../../components/Menu/Menus';
import {connect} from 'react-redux';
import * as actionType from '../../store/mychart/action';
import * as actionMenuType from '../../store/menu/actions';
import {NavLink} from 'react-router-dom';
import * as userActionType from '../../store/userprofile/actions';

class Home extends Component {

    componentDidMount() {
        this.props.onInitMenu();
        if(this.props.isLogin){
           /* console.log('TOKEN:'+this.props.token);
            console.log('USERID:'+this.props.userId);
            this.props.initUserProfile(this.props.token,this.props.userId);*/
        }
    }

    render() {
        let menuPanel = <div><img alt="loading" src={loading}/></div>

        if (this.props.menu.length > 0) {
            menuPanel = <Menus menu={this.props.menu} showButton={this.props.isLogin} clicked={this.props.addMenu}/>;
        }

        if (this.props.error === true) {
            menuPanel = <h5>Cant load menu</h5>;
        }

        let loginButton=null;
        if(!this.props.isLogin) loginButton=( <div style={{marginTop:'35px'}}>
            <NavLink to="/signin"><button className="btn btn-success"><h5>Sign In to Purchase Some Burger</h5></button></NavLink>
        </div>);

        return (<Wrapper>
            <div className={classes.Banner}>
                <div className={classes.BannerText}>
                    <div className={classes.LogoContainer}>
                        <Logo size="100%"/>
                    </div>
                    <h4 style={{color: '#555'}}>Best Burger in The Town</h4>
                    <hr/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            <div className={classes.Menu}>
                <div className={classes.InsideMenu}>
                    <h1>OUR MENU</h1>
                    <hr/>
                    {menuPanel}
                    {loginButton}
                </div>
            </div>
        </Wrapper>);
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu.menu,
        error: state.menu.error,
        isLogin:state.auth.login,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMenu: (object) => dispatch(actionType.addSingleMenu(object)),
        onInitMenu: () => dispatch(actionMenuType.getMenuFromServer()),
        initUserProfile:(token,userId)=>dispatch(userActionType.getUserProfileFromServer(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);