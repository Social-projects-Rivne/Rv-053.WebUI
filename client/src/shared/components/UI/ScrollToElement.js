import React from 'react';


const scrollToPointHandler = (el) =>{
    var elmnt = document.getElementById(el);
    elmnt.scrollIntoView({behavior: "smooth"});
}

const ScrollToElement = (props) => {
    return(
        <button 
            className={props.className}
            onClick={()=>scrollToPointHandler(props.element)}
        >
            {props.text}
        </button>
    )
}

export default ScrollToElement;