import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from "@material-ui/core/Button";
import Typography from '@mui/material/Typography';
import { removeRequest } from "../../actions/requestsList";
import Grid from '@mui/material/Grid';
import "./style.css"

class Request extends React.Component {
    render() {
        const {request, requestsList} = this.props;

        return (
            <Grid item xs={6}>
            <Card item variant="outlined" sx={{ maxWidth: 600, marginBottom: 10, }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={request.item.imgSrc}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {request.poster}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {request.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="medium"
                        onClick={
                            () => removeRequest(requestsList, request) 
                        }
                    >
                        Solve It
                    </Button>

                </CardActions>
            </Card>
            </Grid>
        )
    }
}

export default Request;