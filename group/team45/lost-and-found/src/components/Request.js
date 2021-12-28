import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import "./style.css"

class RequestComponent extends React.Component {
    render() {
        const {request} = this.props;

        return (
            <Grid item xs={6}>
            <Card item variant="outlined" sx={{ maxWidth: 600, marginBottom: 10, }}>
                <CardMedia
                    component="img"
                    height="200"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {request.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium">{request.status}</Button>
                </CardActions>
            </Card>
            </Grid>
        )
    }
}

export default RequestComponent;