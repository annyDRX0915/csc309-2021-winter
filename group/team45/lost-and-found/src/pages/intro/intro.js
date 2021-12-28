import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import $ from "jquery";
import "./intro.css";
import Profile from "../profile/profile";
import img from './lost_found.jpeg'

class Intro extends React.Component {
    state = {
    }
    switchPage(){
        window.location.href = '/login'
    }

    render() {
        return(
            <div>
                <div className="upper"> </div>

                <div className="picture-class">
                    <img className="picture" src={img} alt=''/>
                </div>
                <div className="container">
                    <div className='banner'>Lost and Found Website</div>
                    <div className='info'>
                    <p className="slogan">Make lost not be problems anymore.</p>
                    <button className="button-5" role="button" onClick={this.switchPage}>Kick to login</button>
                    <div className='flex'>
                        <div className='number-card'>
                            <p className='redtxt'>WHAT</p>
                            <p className="small">FIND BACK LOST ITEMS</p>
                        </div>
                        <div className='number-card'>
                            <p className='redtxt'>HOW</p>
                            <p className="small">ALL ON WEBSITE</p>
                        </div>
                        <div className='number-card'>
                            <p className='redtxt'>WHY</p>
                            <p className="small">EASY AND EFFECTIVE</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="lower"> </div>

            </div>
        )
    }
}
export default Intro;