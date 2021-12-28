import React, { useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';
import "./search.css";

//import { items } from "./item";
import Header from "../../components/header.js";
import SearchBar from "../../components/searchBar.js"; 


import QuestionMark from "../../photos/quesiton_mark.png"


const API_HOST = 'http://localhost:5000'



function Search() {

    
    const { search } = useLocation();
    const { content } = queryString.parse(search);
    
    //console.log(content.toLowerCase());
    //console.log(content.toLowerCase().includes('a'));
    
    const [searchField, setSearchField] = useState("");
    const [posts, setPosts] = useState([]);

    const request = new Request(`${API_HOST}/post`, {
        method: "GET",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if(res.status === 200) {
                return res.json()
            }
        })
        .then(json => {
            setPosts(json.posts)
        })
        .catch(error => {
            console.log(error);
        });

    
    return(
            <div>  
                <Header/>

                <SearchBar placeholder='Please type your item name' 
                onChange={(e) => setSearchField(e.target.value)}
                Link={'/search/?content=' + searchField}/>
                
                <div id="SearchCardContainer">
                    <div className="SearchHeader">
                        <h3>search result for "{content}"</h3>
                    </div>
                {posts.filter(i => i.item.toLowerCase().includes(content.toLowerCase())).map((data) => {
                        return (
                        <div className="SearchRectangle" key={data._id.valueOf()}>
                            <img src={QuestionMark} className="searchCardImg" alt="lg"/>
                            <div className="searchCardInner">
                                <Link to={"/post/?id=" + data._id.valueOf()} className="searchIdLink"><h3>{data.item}</h3></Link>
                                <p> Type: {data.type}</p>
                                <p> Time: {data.date + " " +    data.time}</p>
                                <p> Location: {data.location}</p>
                            </div>
                        </div>
                        )
                    }
                    )}
                </div>
                </div>
        )
}


export default Search;