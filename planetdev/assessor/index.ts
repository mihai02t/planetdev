import express from 'express';
import cors from 'cors';
import { PythonShell } from 'python-shell';
import { promises as fs } from 'fs';

import Test from './utils/Test';

const app = express();
const port = process.env.port || 5001;

app.use(cors({
    origin: 'http://localhost:5000',
    methods: 'POST'
}));
app.use(express.json());

app.post('/', async (req, res) => {
    const code = req.body.code as string;
    const tests = req.body.tests as Test[];

    await fs.writeFile('script.py', code);

    let failed = false, testsRun = 0;
    let testInstances = [] as PythonShell[];
    tests.forEach(test => {
        // let output = "";
        // let shell = new PythonShell('script.py', { mode: 'text' });
        // shell.on('message', (message) => {
        //     output += message;
        // }).on('close', () => {
        //     if(output !== test.output) {
        //         failed = true;
        //         if(test.input.length)
        //             return res.status(201).json({ message: `Wrong answer on input:\n${test.input}\nExpected:\n${test.output}\nbut got:\n${output}` });
        //         else
        //             return res.status(201).json({ message: `Wrong answer:\nExpected:\n${test.output}\nbut got:\n${output}` });
        //     }
        // }).end((err) => {
        //     if(err)
        //         return res.status(201).json({ message: err.message });
        // });

        testInstances.push(PythonShell.run('script.py', {}, (err, outputs) => {
            testsRun += 1;
            if(err) {
                failed = true;
                return res.status(201).json({ message: err.message });
            }
            else {
                let content = "";
                if(outputs)
                    outputs.forEach(output => { content += output + '\n' });

                content = content.trim();
                console.log(content);
                console.log(test.output);
                if(content !== test.output) {
                    failed = true;
                    if(test.input.length)
                        return res.status(201).json({ message: `Wrong answer on input:\n${test.input}\nExpected:\n${test.output}\nbut got:\n${content}` });
                    else
                        return res.status(201).json({ message: `Wrong answer:\nExpected:\n${test.output}\nbut got:\n${content}` });
                }
            }
        }));

    });

    setTimeout(() => {
        if(!failed && testsRun === tests.length)
            return res.status(200).json({ message: 'Code is correct' });
        else if(!failed) {
            testInstances.forEach(test => {
                test.kill("SIGKILL");
            });
        }
    }, 4500);
});

app.listen(port, () => {
    console.log(`Assessor is running on port: ${port}`);
});