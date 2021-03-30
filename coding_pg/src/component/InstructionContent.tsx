import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const contentStyles = makeStyles((theme: Theme) =>
createStyles({
    typ:{
        padding: theme.spacing(2),
    }
}));

const InstructionContent = () =>{
    const classes = contentStyles()
    return ( <div>
    <Typography className = {classes.typ}>
    This is also an example<br />
    To print an output in python we use the print() method. 
    We put the respective statement in the brackets () encased in 
    either double quotes “” or single quotes ‘’
    </Typography>
    </div>)
}
export default InstructionContent;