import React from 'react';
import { makeStyles , createStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { Dialog, Slide, AppBar } from '@material-ui/core';
import { Typography, Toolbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Instruction from './component/Drawer'
import Editor from './component/Coding'
// import Header from './component/Header'
// import DialogContent from '@material-ui/core/DialogContent';
// import MenuIcon from '@material-ui/icons/Menu';



const drawerWidth = 380;

const rootStyles = makeStyles((theme: Theme) =>
createStyles({
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

export default function CodingPage() {
  const classes = rootStyles();

  var [dialogOpen, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    dialogOpen = false;
  };

  // const [draweropen, setDrawerOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setDrawerOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setDrawerOpen(false);
  // };

  return (
    <div>
    <Dialog fullScreen open={dialogOpen} 
    onClose={handleClose} 
    TransitionComponent={Transition}>
        <div className = {classes.root}>
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
              Journey Start Here
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
          <Instruction />
          <Editor />
        </div>
      </Dialog>
    </div>
  );
}

