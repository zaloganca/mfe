import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createMemoryHistory} from 'history';

//mount function to start up the app
const mount=(el,{onNavigate})=>{
    const history = createMemoryHistory();
    //we tell the memory history object that whenever the url changes we want automatically to call onNavigate function
    //whenever a user clicks on link(Pricing) we gonna update our memory history. memory history 
    //automatically will call callback
    if(onNavigate){
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history}/>,
        el
    );
    //every time the container does some navigation
    return{
        onParentNavigate({pathname: nextPathname}){
            const {pathname} = history.location;
            //keeping history object in sync
            if(pathname !== nextPathname){
                history.push(nextPathname);
            }
        }
    }
}

//if we are in development and in isolation,
//call mount immediately
if(process.env.NODE_ENV==='development'){
    const devRoot = document.querySelector('#_marketing-dev-root');

    if(devRoot){
        mount(devRoot,{});
    }
}

//otherwise(we are running through container)
//we should export mount function
export {mount};