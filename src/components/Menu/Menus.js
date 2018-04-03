import React from 'react';
import Menu from './Menu';
import classes from './Menu.css';
const menus = (props)=>{

    let menuComponent=<div><h4>No menu available</h4></div>;

    if(props.menu.length > 0){
        menuComponent=(<div className={classes.Menus}>
            {props.menu.map((menu,index)=>{
                return <Menu key={index} data={menu} showButton={props.showButton} clicked={()=>props.clicked(menu)} />
            })}
        </div>);
    }

    return (<div>
        {menuComponent}
    </div>);
}

export default menus;