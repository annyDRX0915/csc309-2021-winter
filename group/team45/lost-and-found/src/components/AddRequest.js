import React from "react"
import "./AddRequest.css";

function AddRequest(props){
    return(
        <div id='SearchBarContainer'>
            <input className='searchBox'
            type='text'
            name='item' 
            placeholder={props.placeholder}
            onChange={props.onChange}/>
            <button className='RequestButton' onClick={props.onSubmit}>Send Request to Admin</button>
        </div>
    )
}

export default AddRequest