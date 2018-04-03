import React from 'react';
import classes from './Menu.css'
import NumericFormater from '../../common/helper/NumericFormater';
import {NavLink} from 'react-router-dom';

const menu = (props) => {
    const css = [classes.Menu, 'row'].join(' ');
    let defaultTemplate = null;
    const buttonCSS = ['btn', 'btn-success', classes.MenuButton].join(' ');

    if (props.data.custom === true) {
        defaultTemplate = (<div className={css}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <h4>{props.data.name}</h4>
                <p>{props.data.description}</p>
                <NavLink
                    to="/burger/builder"
                    exact>
                    {props.showButton ? <button className={buttonCSS}><i className="material-icons">&#xE8ED;</i> Create Burger</button>:null}
                </NavLink>

            </div>
        </div>);
    } else {
        defaultTemplate = (<div className={css}>
            <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                <img alt={props.data.name} src={props.data.image}/>
            </div>
            <div className="col-9 col-sm-9 col-md-9 col-lg-9">
                <h4>{props.data.name}</h4>
                <p>{props.data.description}</p>
                <h5>IDR <NumericFormater amount={props.data.regularPrice}/></h5>
                {props.showButton ? <button className={buttonCSS} onClick={props.clicked}><i className="material-icons">&#xE854;</i> Add to chart</button> : null}
            </div>
        </div>);
    }
    return defaultTemplate;
}

export default menu;