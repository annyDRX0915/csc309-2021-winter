import React from "react";
import { Link } from "react-router-dom";
import "./display.css";

//import { items } from "./item";
import Header from "../../components/header.js";
import SearchBar from "../../components/searchBar.js"; 


import { getPosts } from "../../action/post";

import QuestionMark from "../../photos/quesiton_mark.png"



class Display extends React.Component {
    
    constructor(){
        super();
        this.state = {
            searchField: '',
            postList: []
        }
    }
    
    
    render() {
        getPosts(this)
        const { searchField, postList } = this.state;
        return (
            <div>  
                <Header app={this.props.app}/>

                <SearchBar placeholder='Please type your item name' 
                onChange={(e) => this.setState({searchField:e.target.value})}
                Link={'/search/?content=' + searchField} Link2={'/makepost'}/>
                <div id="LostAndFoundCardContainer">
                    <div className="LostAndFoundItemHeader">
                        <h2>Found Items</h2>
                    </div>
                {postList.filter(i => i.type == "found").map((data) => {
                        return (
                        <div className="displayCardContainer" key={data._id.valueOf()}>
                            <div className="displayCardInner">
                                <Link to={"/post/?id=" + data._id.valueOf()} className="displayIdLink"><h3>{data.item}</h3></Link>
                                <p> time: {data.date + " " + data.time}</p>
                                <p> location: {data.location}</p>
                                <img src={QuestionMark} className="displayCardImg" alt="lg"/>
                            </div>
                        </div>
                        )
                    }
                    )}
                </div>

                <div id="LostAndFoundCardContainer">
                    <div className="LostAndFoundItemHeader">
                        <h2>Lost Items</h2>
                    </div>
                    {postList.filter(i => i.type == "lost").map((data) => {
                        return (
                        <div className="displayCardContainer" key={data._id.valueOf()}>
                            <div className="displayCardInner">
                                <Link to={"/post/?id=" + data._id.valueOf()} className="displayIdLink"><h3>{data.item}</h3></Link>
                                <p> time: {data.date + " " + data.time}</p>
                                <p> location: {data.location}</p>
                                <img src={QuestionMark} className="displayCardImg" alt="lg"/>
                            </div>
                        </div>
                        )
                    }
                    )}
                </div>
            </div>
        );
        
    }
}


export default Display;