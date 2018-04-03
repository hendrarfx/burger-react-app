import React from 'react';
import logoImage from '../../assets/images/logo.png';

const logo = (props) => (<img alt="Burger Builder" style={{width:props.size,height:'auto'}} src={logoImage} />);

export default logo;