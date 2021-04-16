import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Grid, Paper, Button, Typography, Dialog} from '@material-ui/core';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import Solution from './Solution'
import Incorrect from './Incorrect'
import ChallengeInUser from '../../../utils/types/ChallengeInUser';
import { evaluateCode } from '../services';
import { toast } from 'react-toastify';

export interface EditorProps {
    userChallenge: ChallengeInUser;
};

const contentStyles = makeStyles((theme: Theme) => createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
    },
    paper: {
        background: '#3e3e3e'
    },
    button: {
        backgroundColor: "#2c57cc", //#111e6c, 2c56d3 
        color: "white"
    },
    text: {
        color: "white"
    }
}));

const Editor = (props: EditorProps) => {
    const classes = contentStyles();
    const fontSize = 18;
    const [open, setOpen] = React.useState(false);
    const [c_open, c_setOpen] = React.useState(false);
    const [c_message, c_setMessage] = React.useState("");
    const [code, setCode] = React.useState(props.userChallenge.code);

    const [submitDisable, setSubmitDisable] = React.useState(props.userChallenge.completed);
    const [editorDisable, setEditorDisable] = React.useState(false);

    const onChange = (newValue: string) => {
        setCode(newValue);
    };

    const submitCode = async () => {
        setSubmitDisable(true);
        setEditorDisable(true);

        const res = await evaluateCode(props.userChallenge.challengeId.toString(), code);
        setEditorDisable(false);
        if(res.error) {
            setSubmitDisable(false);
            c_setMessage(res.message);
            return c_setOpen(true);
        }

        toast(res.message);
    };

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Paper className={classes.paper}>
                <AceEditor
                    mode="python"
                    theme="twilight"
                    name="app_code_editor"
                    onChange={onChange}
                    fontSize={fontSize}
                    defaultValue={code}
                    readOnly={editorDisable}
                    showPrintMargin
                    showGutter
                    highlightActiveLine
                    style={{width: '100%', height: '88vh'}} //, minHeight: 620
                    // commands={[{  
                    //        name: 'saveFile', 
                    //        bindKey: {win: 'Ctrl-S', mac: 'Command-S'}, 
                    // }
                // ]}
                    setOptions={{
                        enableBasicAutocompletion: false, 
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 4
                    }}
                />
                <Grid item container justify='space-between' style={{minHeight: 30}}>
                    <Grid item>
                        <Button
                            variant="contained"
                            disabled
                            onClick={() => {setOpen(true)}}
                            className={classes.button}>
                                Solution
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography className={classes.text}>
                            - Clink left to see solution or right to submit your work -
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => {submitCode()}}
                            disabled={submitDisable}>
                            {/* onClick={() => {c_setOpen(true)}} --- if file Incorrect is used*/}
                                Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Solution open={open} setOpen={setOpen}></Solution>
            {/* If answer is corrent, go to next one, else show this dialog*/}
            <Incorrect message={c_message} c_open={c_open} c_setOpen={c_setOpen}></Incorrect>
        </main>
    );
};

export default Editor;
