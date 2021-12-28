import React from "react"
import "./searchBar.css";
import { Link } from "react-router-dom";

function SearchBar(props){
    return(
        <div id='SearchBarContainer'>
            <input className='searchBox'
            type='text'
            name='item' 
            placeholder={props.placeholder}
            onChange={props.onChange}/>
            <div className='searchButton'>
                <Link className="search_link" to={props.Link}>Search</Link>
                <Link className="search_link" to={props.Link2}>Add</Link>
            </div>
        </div>
    )
}

export default SearchBar