import React from "react";
import "./card.css";
import phoneImg from "./phone.jpg";
class Card extends React.Component {
    render() {
        return (
            <div className="rectangle">
                <div className="cardInner">
                <p> item: phone</p>
                <p> time: 2021-05-05</p>
                <p> location: toronto, ON</p>
                <p> line: 506</p>
                <img src={phoneImg} className="cardImg" alt="lg"/>
                </div>
            </div>
        );
    }
}

export default Card;