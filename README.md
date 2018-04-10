# Welcome to the burger-react-app
this is my first react project with reactjs, redux, react-router, axios, and redux-saga. 
This project use firebase database to store application data.

# Demo
click this url to try application https://plasma-kit-138623.firebaseapp.com/

# Setup
Follow this step to run this application in your environment
```sh
npm install

npm start
```

# Project Structure

```
burgerproject/
  README.md
  package.json
  config/
  public/
  scripts/
  src/
    assets/
    common/
       helper/
       hoc/
       middleware/
    components/
    containers/
        Home/
        Layout/
        AppRouter.js
    store/
        folder_name/
            reducer.js
            action.js
            saga.js
            watch.js
    axios.config.js
    burgerApp.js
    index.css
    index.js
    logo.svg
```
#### Assets Folder
Assets folder is used to put the image and another media

#### Common Folder
Common folder is used to put helper function, high order component, and middleware that commonly used in the project

#### Containers Folder
Containers folder is used to put all containers component. 
Basically all of the components in this folder is stateful because I want to manage state inside containers.

Inside this folder, there are AppRouter.js to handle all of routes in this project.
```$xslt
<Route
    exact
    path="/"
    component={asyncComponent(() => import('./Home/Home.js'))}
    />
```
In the code above, I use asyncComponent class to call containers component. But you can import them like usual.
AsyncComponent class will handle how to import component class asynchronously.I use asyncComponent because I don't want container component class is loaded before the route is opened.

#### Components Folder
Components folder is used to put all components inside containers.
Basically I want the components in this folder are stateless. But some few of them are stateful.

Why I am using some stateful component?
 - I want to use component lifecycle to handling some props mutation from state in the container. I use this case in Modal.js in /components/UI/Modal.
 - I want to use some props type to handling component input

#### Store
All the implementation of redux in this folder. I am using redux to manage state and redux-saga to manage asynchronous code inside redux.
Basically, you can also use redux thunk to handle asynchronous code inside redux. I don't want using callback function when fetching data from server. Sometimes, callback function is difficult to handle if the function become complex.

#### axios.config.js
axios.config.js is the file that manage configuration of link server
```$xslt
import axios from 'axios';

const instance = axios.create({
    baseURL: 'your_firebase_url'
});

export default instance;
```

# Supported Browsers
By default, the generated project uses the latest version of React.
You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.
