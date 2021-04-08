import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

export interface SolutionProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const Solution = (props: SolutionProps) => {
    const { open, setOpen } = props;
    const fontSize = 15;

    function onChange(newValue: any) {
        console.log("change", newValue);
    }

    return (
        <Dialog open={open} onClose={() => {setOpen(false)}}>
            <DialogTitle>
                <div>Solution</div>
            </DialogTitle>
            <DialogContent>
                <div>
                    <AceEditor
                        mode="python"
                        theme="monokai"
                        name="app_code_editor"
                        onChange={onChange}
                        fontSize={fontSize}
                        readOnly={true}
                        value={`This place is for solution`}
                        showPrintMargin
                        showGutter
                        highlightActiveLine 
                        enableSnippets
                        style={{width: 500, minHeight: 300}} //, minHeight: 620
                        setOptions={{
                            enableBasicAutocompletion: false, 
                            enableLiveAutocompletion: true,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 6
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Solution;