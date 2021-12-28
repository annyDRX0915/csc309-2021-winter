import React from "react";
import AdminNav from "./AdminNav";
import Request from "./request"
import { uid } from "react-uid";
import Grid from '@mui/material/Grid';
import './style.css'

class RequestTable extends React.Component {
    state = {
        requests: [{
            poster: "user1",
            posterId: 1,
            content: "I lost a item, but I cannot contact with the finder",
            item: {
                item: "phone", 
                time: "2021-12-05", 
                location: "toronto, ON", 
                line: "506",
                lost: false,
                imgSrc: require('../../photos/2.jpg').default,
                id: 2
            },
        },
        {
            poster: "user2",
            posterId: 2,
            content: "I lost a item, but I am not sure who is the finder",
            item: {
                item: "dog", 
                time: "2021-01-05", 
                location: "toronto, ON", 
                line: "506",
                lost: true,
                imgSrc: require('../../photos/1.jpg').default,
                id: 1
            },
        },
        {
            poster: "user3",
            posterId: 3,
            content: "I am a founder, and I suspect someone falsely claims his item",
            item: {
                item: "wallet", 
                time: "2021-01-05", 
                location: "toronto, ON", 
                line: "506",
                lost: true,
                imgSrc: require('../../photos/5.jpg').default,
                id: 5
            },
        }
        ],
    }

    render() {
        return (
            <div>
                <AdminNav />

                <Grid sx={{width: '80%', marginTop: '5%', marginLeft: '15%'}} container rowSpacing={1} columnSpacing={5}>
                    {this.state.requests.map(request => (
                        <Request
                            key={uid(
                            request
                            )} 
                            request = {request}
                            requestsList = {this}
                        />
                    ))}
                </Grid>
            </div>
        )
    }
}

export default RequestTable;