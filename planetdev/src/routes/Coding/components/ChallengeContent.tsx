import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface ChallengeContentProps {
    content: string;
};

const contentStyles = makeStyles((theme: Theme) => createStyles({
    typ: {
        padding: theme.spacing(2)
    }
}));

const ChallengeContent = (props: ChallengeContentProps) => {
    const classes = contentStyles();
    return (
        <div>
            <Typography className = {classes.typ}>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    {props.content}
                </div>
            </Typography>
        </div>
    );
};

export default ChallengeContent;