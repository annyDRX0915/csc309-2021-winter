import React from "react";
import ProfileNav from "../../components/ProfileNav";
import RequestComponent from "../../components/Request"
import { uid } from "react-uid";
import Grid from '@mui/material/Grid';
import AddRequest from "../../components/AddRequest";
import './style.css'
const API_HOST = 'http://localhost:5000'
class SendReuqest extends React.Component {
    state = {
        field: "",
        requests: this.props.app.state.requests
    }

    render() {
        const handleChange = (e) => {
            this.setState({
                field: e.target.value
            })
        }

        const handleSubmit = () => {
            const request = new Request(`${API_HOST}/profile/request`, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: this.props.app.state.id,
                    description: "hello",
                    username: this.props.app.state.username
                }),
            });

            // Send the request with fetch()
            fetch(request)
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    }
                })
                .then(info => {
                    const newRequest = {
                        posterId: info.request._id,
                        content: info.request.description,
                        status: info.request.status 
                    }
                    this.state.requests.push(newRequest)
                    this.setState({requests: this.state.requests})
                })
                .catch(error => {
                    console.log(error);
                });
            
        }

        return (
            <div>
                <ProfileNav app={this.props.app}/>
                <div className="request">
                    <p >New Request</p>
                    <AddRequest
                        placeholder='Please type in your request'
                        onChange={handleChange} 
                        onSubmit={handleSubmit}/>
                </div>
                <Grid sx={{ width: '80%', marginTop: '5%', marginLeft: '15%' }} container rowSpacing={1} columnSpacing={5}>

                    {this.state.requests.map(request => (
                        <RequestComponent
                            key={uid(
                                request
                            )}
                            request={request}
                        />
                    ))}
                </Grid>
            </div>
        )
    }
}

export default SendReuqest;