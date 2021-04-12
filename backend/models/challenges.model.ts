import mongoose, { Model, Document } from 'mongoose';

export interface Test extends Document {
    input: string;
    output: string;
}

export interface Challenge extends Document {
    [x: string]: any;
    statement: string;
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
    statement: String,
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
                statement: 'Task 11',
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
                statement: 'Task 12',
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
