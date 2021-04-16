import { Dialog, DialogActions, DialogContent, DialogContentText, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
// import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
    icons: {
        color: 'red',
        fontSize: 80,
    },
    dialog: {
        background: 'lightCoral'
    }
});

export interface IncorrectProps {
    c_open: boolean;
    message: string;
    c_setOpen: (value: boolean) => void;
}

const Incorrect = (props: IncorrectProps) => {
    const { c_open, c_setOpen } = props;
    const classes = useStyles();

    return (
        <Dialog open={c_open} onClose={() => {c_setOpen(false)}}>
            <DialogContent className={classes.dialog}>
                <DialogContentText>
                    <Box display="flex">
                        <ClearIcon className={classes.icons}/>
                    </Box>
                    <div style={{whiteSpace: 'pre-wrap'}}>{props.message}</div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {c_setOpen(false)}} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
        // <CheckIcon className = {classes.icons2}/>
        // <div >Correct !</div>
    );
};

export default Incorrect;