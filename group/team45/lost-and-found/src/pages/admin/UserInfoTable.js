import React from "react";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import UserInfo from "./userInfo";

import "./style.css";

class UserInfoTable extends React.Component {
    render() {
        const {users, usersList} = this.props;

        return (
            <div>
                <Table className="userTable">
                    <TableHead>
                        <TableRow className="userheader">
                            <TableCell component="th" scope="row">username</TableCell>
                            <TableCell component="th" scope="row">email</TableCell>
                            <TableCell component="th" scope="row">phone</TableCell>
                            <TableCell component="th" scope="row">option</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                        <UserInfo
                            key={uid(
                            user
                            )} /* unique id required to help React render more efficiently when we modify the students list. */
                            user = {user}
                            usersList = {usersList}
                        />
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default UserInfoTable;