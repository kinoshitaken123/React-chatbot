import React from 'react';
import Button from '@material-ui/core/Button';


const Answer = (props) => {
    // const classes = useStyles();

    return (
        <Button variant="contained" color="primary">
         {props.content}
        </Button>
    )
}

export default Answer