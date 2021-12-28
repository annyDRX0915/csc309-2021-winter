import React from "react"
import "./post.css"
import { Redirect } from 'react-router-dom';

const API_HOST = 'http://localhost:5000'
class MakePost extends React.Component {
    state = {
        link: "/display",
        submit: false,
        item: "",
        date: "",
        time: "",
        location: "",
        description: "",
        type: ""
    }

    render() {
        const cancel = () => {
            this.setState({ submit: true })
        }
        const update = (event) => {
            const target = event.target;
            const value = target.value;
            const name = target.name;


            this.setState({
                [name]: value
            });
        }
        const submit = () => {
            if(this.state.item == "" || this.state.type == ""){
                return
            }
            console.log(this.state)
            const request = new Request(`${API_HOST}/makepost`, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: this.props.app.state.id,
                    username: this.props.app.state.name,
                    item: this.state.item,
                    type: this.state.type,
                    date: this.state.date,
                    time: this.state.time,
                    location: this.state.location,
                    description: this.state.description
                }),
            });

            // Send the request with fetch()
            fetch(request)
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    }
                })
                .then(info => {
                    this.setState({ submit: true })
                    this.props.app.setState({ losts: info.result.posts })
                })
                .catch(error => {
                    console.log(error);
                });
        }
        if (this.state.submit) {
            return <Redirect to={this.state.link} />
        }
        return (
            <div id="body">
                <div id="header">
                    <h1 className='logo'>Make Post</h1>
                </div>

                <div className="post_div">
                    <h3 >Pick Post Type</h3>
                    <form onChange={update}>
                        <input type ="radio" id="lost" name="type" value="lost"/>
                        <label for="lost">lost</label> <br/>
                        <input type ="radio" id="found" name="type" value="found"/>
                        <label for="found">found</label>
                    </form>
                    </div>

                    <div id="mid" className="post_div">
                    <h3 >Show item type below</h3>
                    <form id="checkbook_item" onChange={update}>
                <input className="input"  type="radio" id="phone" name="item" value="phone" />
                        <label for="phone"> Phone </label><br />
                        <input className="input"  type="radio" id="clothing" name="item" value="clothing" />
                        <label for="clothing"> Clothing </label><br />
                        <input className="input"  type="radio" id="card" name="item" value="card" />
                        <label for="card"> Card </label><br />
                        <input className="input"  type="radio" id="document" name="item" value="document" />
                        <label for="card"> Document </label><br />
                        <input className="input"  type="radio" id="belongings" name="item" value="belongings" />
                        <label for="card"> Belongings </label><br />
                        
                    </form>
                    </div >

                    <div className="post_div">
                    <h3 >Description</h3>
                    <input className="input" type ="text" id="other" name="description" placeholder="Optional" onChange={update} />

                    </div>
                    
                    <div className="post_div">
                    <h3 >Show lost time below</h3>
                    <form>
                    <p> Select the date: <input className="input" type ="date" id="date" name="date" onChange={update} /></p>
                    <p> Select the time: <input className="input" type ="time" id="appt" name="time" onChange={update} /></p>
                    </form>
                    </div>

                {/*<div className="post_div">*/}
                {/*    <input className="input"  id="upload-input"  type="file"*/}
                {/*           accept="image/gif, image/jpg, image/png" />*/}
                {/*    <div id="location">*/}
                {/*        <h3 > Upload images (Click to upload): <img id="upload"*/}
                {/*                                                    src='./download.png' alt="Click me"/></h3>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="post_div">*/}
                {/*    <input id="upload-input" type="file" accept="image/gif, image/jpg, image/png" />*/}
                {/*    <div id="location">*/}
                {/*        <h3 id="image"> Upload images (Click to upload): <img id="upload"*/}
                {/*                                                                            src="./download.png"*/}
                {/*                                                                            style="width: 60px;*/}
                {/*                                              height: 60px;*/}
                {/*                                              vertical-align: middle;*/}
                {/*                                              border: 1px solid #ff4b2b; border-radius: 20px;"*/}
                {/*        /></h3>*/}
                {/*    </div>*/}
                {/*</div>*/}


                    <h3 className="post_div">Choose lost location</h3>
                {/*<p className="post_div">Click on a location on the map to select it.*/}
                {/*    Drag the marker to change location.</p>*/}
                {/*<div id="map" className="post_div"></div><br/>*/}

                    <form method="post" className="post_div">
                {/*<p>Latitude: <input className="input"  type="text" id="lat" readonly="yes" /><br/></p>*/}
                {/*<p>Longitude: <input className="input"  type="text" id="lng" readonly="yes" /></p>*/}
                    <label for="locat"> Location: </label>
                    <input className="input" type ="text" id="locat" name="location" placeholder="required" onChange={update} />
                    </form>

                    <script type ="text/javascript" src="./map.js" />

                    <button className="cancel_button" onClick={submit}>Submit</button>
                    <button className="cancel_button" onClick={cancel}>Cancel</button>
                </div>
                )
    }
}

                export default MakePost