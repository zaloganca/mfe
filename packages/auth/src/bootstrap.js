import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createMemoryHistory, createBrowserHistory} from 'history';

//mount function to start up the app
//defaultHistory only if we run in isolation marketing app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history =
      defaultHistory ||
      createMemoryHistory({
        initialEntries: [initialPath],
      });
    //we tell the memory history object that whenever the url changes we want automatically to call onNavigate function
    //whenever a user clicks on link(Pricing) we gonna update our memory history. memory history 
    //automatically will call callback
    if(onNavigate){
        history.listen(onNavigate);
    }

    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

    return{
          onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;
            //keeping history object in sync
            //update memory history with the new path
            if (pathname !== nextPathname) {
                history.push(nextPathname);
              }
            },
    }
}

//if we are in development and in isolation,
//call mount immediately
if(process.env.NODE_ENV==='development'){
    const devRoot = document.querySelector('#_auth-dev-root');

    if(devRoot){
        mount(devRoot,{defaultHistory: createBrowserHistory(0)});
    }
}

//otherwise(we are running through container)
//we should export mount function
export {mount};