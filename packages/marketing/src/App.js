import React from 'react';
import {Switch,Route,BrowseRouter} from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';


import Landing from './components/Landing';
import Pricing from './components/Pricing';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

export default ()=>{
    return (<div>
        <StylesProvider>
            <BrowserRouter>
            <Switch>
                <Route exact path="/pricing" component={Pricing} />
                <Route path="/" component={Landing} />
            </Switch>
            </BrowserRouter>
        </StylesProvider>
    </div>);
}

