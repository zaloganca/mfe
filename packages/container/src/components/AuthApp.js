import {mount} from 'auth/AuthApp';
import React,{useRef,useEffect} from 'react';
import {useHistory} from 'react-router-dom';


//communication from Marketing to container
export default ({onSignIn})=>{
    const ref = useRef(null);
   //history object used inside our container(copy of browser history)
   const history =useHistory();
    useEffect(()=>{
      const {onParentNavigate} = mount(ref.current,{
         initialPath: history.location.pathname,
            //what was communicate from memory history inside marketing up to container
            //pathname=current path
            //nextPathname navigate to
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;
        
                if (pathname !== nextPathname) {
                  history.push(nextPathname);
                }
              },
           //whenever user submits that sign in or sign up form we call the callback
           //pass onSignIn to auth/bootstrap
           //prop come in = on SignIn
            // onSignIn: ()=>{
            //   //we pass down  a callback onSignIn as well
            //   onSignIn();
            // }
            onSignIn,
        }); //we pass the reference to html element
        //any time is any change to our browser history we want to call onParentNavigate
        history.listen(onParentNavigate);
    },[]);
    return <div ref={ref} />;
};