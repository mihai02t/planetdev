import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles , createStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { Dialog, Slide, AppBar, Button } from '@material-ui/core';
import { Typography, Toolbar } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Instruction from './components/Instruction';
import Editor from './components/Editor';
// import Header from './component/Header'
// import DialogContent from '@material-ui/core/DialogContent';
// import MenuIcon from '@material-ui/icons/Menu';

import { useRequiresAuthentication } from '../../utils/authService';
import Challenge from '../../utils/types/Challenge';
import { fetchChallenge } from './services';

export const CODING_PATH = '/coding/:id';

const drawerWidth = 380;

const rootStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: "flex"
    },
    header: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        background: '#3e3e3e',
    },
    title: {
            flex: 1,
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: '#2c57cc',
        color: "white"
    }
    // dialog: {
    //   padding: theme.spacing(1)
    // }
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Coding = () => {
    const classes = rootStyles();
    const history = useHistory();
    const { loggedIn, user } = useRequiresAuthentication();
    const { id } = useParams() as { id: string };

    let [dialogOpen, setOpen] = React.useState(true);
    const [challenge, setChallenge] = React.useState(null as Challenge | null);

    const handleClose = () => {
        setOpen(false);
        history.go(-1);
    };

    useEffect(() => {
        const getData = async () => {
            setChallenge(await fetchChallenge(id));
        };

        getData();
    }, []);

    // const [draweropen, setDrawerOpen] = React.useState(false);

    // const handleDrawerOpen = () => {
    //   setDrawerOpen(true);
    // };

    // const handleDrawerClose = () => {
    //   setDrawerOpen(false);
    // };

    if(!loggedIn || !user) return null;

    const userChallenge = user.challenges.find(e => e.challengeId.toString() === id);

    return (
        <div>
            <Dialog
                fullScreen
                open={dialogOpen} 
                onClose={handleClose} 
                TransitionComponent={Transition}
            >
                <div className={classes.root}>
                    <AppBar className={classes.header}>
                        <Toolbar>
                            {/* <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start">
                                <MenuIcon />
                            </IconButton> */}
                            <Typography variant="h6" className={classes.title}>
                                {challenge?.title}
                            </Typography>
                            <Button
                                variant="contained"
                                className={classes.button}
                                onClick={handleClose}
                                startIcon={<ArrowBackIcon />}
                            >
                                Back to planet
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {challenge && <Instruction challenge={challenge}/>}
                    {userChallenge && <Editor userChallenge={userChallenge}/>}
                </div>
            </Dialog>
        </div>
    );
};

export default Coding;