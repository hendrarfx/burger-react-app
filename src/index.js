import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import BurgerApp from './burgerApp';

const app = <BurgerApp/>

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
