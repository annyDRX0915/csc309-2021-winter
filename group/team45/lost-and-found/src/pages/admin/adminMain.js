import React from "react";
import AdminNav from "./AdminNav";
import UserInfoTable from "./UserInfoTable";
import "./style.css";
const API_HOST = 'http://localhost:5000'
class adminMain extends React.Component {
    state = {
        users: [{
            id: 1,
            username: "user1",
            email: "user1@user.com",
            phone: "1234567890"
        },
        {
            id: 1,
            username: "user2",
            email: "user2@user.com",
            phone: "987654321"
        },
        {
            id: 1,
            username: "user3",
            email: "user3@user.com",
            phone: "111111111"
        },
        {
            id: 1,
            username: "user4",
            email: "user4@user.com",
            phone: "22222222222"
        }]
    };

    componentDidMount(){
        const request = new Request(`${API_HOST}/admin/user`, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        });
    
        // Send the request with fetch()
        fetch(request)
            .then(res => {
                if(res.status === 200) {
                    return res.json()
                }
            })
            .then(json => {
                this.setState({users: json.users})
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        return (
            <div>
                <AdminNav />

                <div id="tableContainer">
                    <UserInfoTable 
                        users = {this.state.users}
                        usersList = {this}
                    />
                </div>
            </div>
        );
    }
}

export default adminMain; 