import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {removeUser} from "../../actions/userList"
import "./style.css";

class UserInfo extends React.Component {
    render() {
        const { user, usersList } = this.props;
        
        return (
            <TableRow className="userinfo" key={user.username}>
                <TableCell component="th" scope="row">
                    {user.username}
                </TableCell>

                <TableCell component="th" scope="row">
                    {user.email}
                </TableCell>

                <TableCell component="th" scope="row">
                    {user.phone}
                </TableCell>

                <TableCell component="th" scope="row">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={
                        () => removeUser(usersList, user) 
                        }
                    >
                        Remove
                    </Button>
                </TableCell>
            </TableRow>
        )
    }
}

export default UserInfo;


