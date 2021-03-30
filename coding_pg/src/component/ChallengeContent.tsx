import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const contentStyles = makeStyles((theme: Theme) =>
createStyles({
    typ:{
        padding: theme.spacing(2),
    }
}));

const ChallengeContent = () =>{
    const classes = contentStyles()
    return ( <div>
    <Typography className = {classes.typ}>
        This is just an example!<br />
       Hello Astronaut! The first step on your way back to Earth is to let the Space Mission Operations Centre know that your rocket has crashed and now you are stranded on an unknown planet. Luckily your transmitter is still working. 
Write a code to get the following output in order to transmit the message.
Output –
Hello Earth! I am stranded.
    </Typography>
    </div>)
}
export default ChallengeContent;