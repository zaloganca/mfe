import {mount} from 'marketing/MarketingApp';
import React,{useRef,useEffect} from 'react';

export default ()=>{
    const ref = useRef(null);

    useEffect(()=>{
        mount(ref.current); //we pass the reference to html element
    });
    return <div ref={ref} />;
};