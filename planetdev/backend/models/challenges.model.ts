import mongoose, { Model, Document } from 'mongoose';

export interface Test extends Document {
    input: string;
    output: string;
}

export interface Challenge extends Document {
    title: string;
    statement: string;
    instruction: string;
    tests: Test[];
}

export interface Challenges extends Document {
    challenges: Challenge[][];
}

const testSchema = new mongoose.Schema({
    input: String,
    output: String
});

const challengeSchema = new mongoose.Schema({
    title: String,
    statement: String,
    instruction: String,
    tests: [testSchema]
});

const challengesSchema = new mongoose.Schema({
    challenges: [[challengeSchema]]
});

const ChallengesDB: Model<Challenges> = mongoose.model('Challenges', challengesSchema);

export default ChallengesDB;

export async function populateChallenges() {
    ChallengesDB.create({ challenges: [
        [
            {
                title: 'Print statements',
                statement: `Hello Astronaut! The first step on your way back to Earth is to let the Space Mission Operations Centre know that your rocket has crashed and now you are stranded on an unknown planet. Luckily your transmitter is still working.
                Write a code to get the following output in order to transmit the message.
                Output –
                Hello Earth! I am stranded.`,
                instruction: `To print an output in python we use the print() method. We put the respective statement in the brackets () encased in either double quotes “” or single quotes ‘’
                For example the following code:
                Code –
                print(“Hello World!”)
                or
                print(‘Hello World!’)
                will give the following output
                Output –
                Hello World!`,
                tests: [
                    {
                        input: '',
                        output: 'Hello Earth! I am stranded.'
                    }
                ]
            },
            {
                title: 'Assigning variables',
                statement: `You need to transmit the name and age to the centre.
                Write a code assigning the variables ‘n’ and ‘a’ with the name 'Astronaut' and his age, 43, respectively. Print the variables to get the following output.
                Output –
                Astronaut
                43`,
                instruction: `A variable is like a container to store data. In python variables are declared by assigning them
                Code –
                x = 3
                print(x)
                Here x is a variable which is assigned the value 3. On printing x, we get the following output.
                Output –
                3`,
                tests: [
                    {
                        input: '',
                        output: `Astronaut
                        43`
                    }
                ]
            }
        ],
        [
            {
                statement: 'Task 21',
                tests: [
                    {
                        input: '20 21',
                        output: '41'
                    },
                    {
                        input: '10 21',
                        output: '31'
                    },
                ]
            },
            {
                statement: 'Task 22',
                tests: [
                    {
                        input: '20 21',
                        output: '41'
                    },
                    {
                        input: '10 21',
                        output: '31'
                    },
                ]
            }
        ]
    ]});
}
