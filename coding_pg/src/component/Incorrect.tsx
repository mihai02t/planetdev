import { Dialog, DialogContent } from '@material-ui/core';
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
    c_setOpen: (value: boolean) => void;
  }

export default function Incorrect(props: IncorrectProps){
    const { c_open, c_setOpen } = props;
    const classes = useStyles();

    return (
        <Dialog open={c_open} onClose={() => {c_setOpen(false)}}>
            <DialogContent  style={{width: 80}} className={classes.dialog}>
                <ClearIcon className = {classes.icons}/>
                <div >Ops, there could be something wrong !</div>
            </DialogContent>
        </Dialog>
        // <CheckIcon className = {classes.icons2}/>
        // <div >Correct !</div>
    )
}