import React, {Component} from 'react';
import Wrapper from '../../common/hoc/Wrapper';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionType from '../../store/myorder/actions';
import * as userActionType from '../../store/userprofile/actions';
import Orders from '../../components/MyOrder/Orders';
import classes from './MyOrder.css';

class MyOrder extends Component {

    componentDidMount() {
        this.props.initOrder(this.props.token, this.props.userId);
        this.props.initUserProfile(this.props.token, this.props.userId);
    }

    render() {
        let listOrderPanel = this.props.error ? <div><h1>Cant load order</h1></div> : null;
        let spinner = null;
        if (this.props.inProcess && this.props.myOrder.length <= 0) spinner =
            <Spinner show={true} message="Please wait ..."/>;

        if (this.props.myOrder.length > 0) {
            listOrderPanel = <Orders data={this.props.myOrder}/>
        } else {
            listOrderPanel = <div className={classes.MyProfile} align="center"><h4>There are no order data</h4></div>
        }
        const profile = this.props.userProfile.data;

        return <Wrapper classes={classes.MyOrder}>
            <div className="row">
                <div className="col-12 col-sm-3 col-md-3 col-lg-3">
                    <h3>MY PROFILE</h3>
                    <div className={classes.MyProfile}>

                        <img alt="Profile" className={classes.ProfileImage}
                             src="http://www.sherwoodchamber.net/media/com_jbusinessdirectory/pictures/companies/0/profileicon-1487694034.png"/>

                        <h4>{profile.name}</h4>
                        <div style={{fontSize: 'medium'}}>
                            {profile.email}<br/>
                            {profile.phone}
                        </div>

                    </div>
                </div>
                <div className="col-12 col-sm-9 col-md-9 col-lg-9">
                    <h3>ORDER HISTORY</h3>
                    {listOrderPanel}
                </div>
            </div>

            {spinner}
        </Wrapper>;
    }
}

const mapStateToProps = (state) => {
    return {
        myOrder: state.myOrder.myOrder,
        error: state.myOrder.error,
        token: state.auth.user.token,
        inProcess: state.myOrder.inProcess,
        userId: state.auth.user.userId,
        userProfile: state.userProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initOrder: (token, userId) => dispatch(actionType.getOrderFromServer(token, userId)),
        initUserProfile: (token, userId) => dispatch(userActionType.getUserProfileFromServer(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);