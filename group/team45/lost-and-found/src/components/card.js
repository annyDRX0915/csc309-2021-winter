import React from "react";
import "./card.css";
// import walletImg from "./wallet.jpg";
class Card extends React.Component {
    state = {
        item: "wallet",
        time: "2021-02-05",
        location: "toronto, ON",
        line: "506"
    }
    render() {
        return (
            <div className="rectangle">
                <div className="cardInner">
                <p> item: {this.state.item}</p>
                <p> time: {this.state.time}</p>
                <p> location: {this.state.location}</p>
                <p> line: {this.state.line}</p>
                {/* <img src={walletImg} className="cardImg" alt="lg"/> */}
                </div>
            </div>
        );
    }
}

export default Card;