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
                statement:
`Hello Astronaut! The first step on your way back to Earth is to let the Space Mission Operations Centre know that your rocket has crashed and now you are stranded on an unknown planet. Luckily your transmitter is still working.
Write a code to get the following output in order to transmit the message.
Output –
Hello Earth! I am stranded.`,
                instruction:
`To print an output in python we use the print() method. We put the respective statement in the brackets () encased in either double quotes “” or single quotes ‘’
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
                statement:
`You need to transmit the name and age to the centre.
Write a code assigning the variables ‘n’ and ‘a’ with the name 'Astronaut' and his age, 43, respectively. Print the variables to get the following output.
Output –
Astronaut
43`,
                instruction:
`A variable is like a container to store data. In python variables are declared by assigning them
Code –
x = 3
print(x)
Here x is a variable which is assigned the value 3. On printing x, we get the following output.
Output –
3`,
                tests: [
                    {
                        input: '',
                        output: 
`Astronaut
43`
                    }
                ]
            },
            {
                title: 'Commenting',
                statement:
`You have received a message from earth, it’s the output of the following code.
Code –
print(“Use the emergency space shuttle to reach the planet 36”)
Before you follow these instructions, you must add a comment in the beginning of the code saying “message from earth”. The output should remain unchanged.
Output – 
Use the emergency space shuttle to reach the planet 36`,
                instruction:
`It is good practice to comment your code as you write it. Comments are used to explain python code and make the code more readable. A comment cannot be executed, so it can also be used to comment out code you do not want to execute.
Use the following syntax to give a single line comment
Code –
#the following is a comment
And the following to have a multiline comment
Code –
’’’this is used
For multiline
comments’’’’
Comments can also be used in line with executable code. For example:
Code –
Print(“Hello”) #prints Hello`,
                tests: [
                    {
                        input: '',
                        output: `Use the emergency space shuttle to reach the planet 36`
                    }
                ]
            },
            {
                title: 'Casting and type()',
                statement:
`The message asked you to use the emergency space shuttle to go to planet 36 because the shuttle does not have enough fuel to take you back to earth and according to the scientists at Earth you can find more help at planet 36.
The emergency space shuttle navigates independently once the planet number has been entered. Assign a variable ‘x’ the value 36 and print its datatype using the type() function ensuring the following output.
Output – 
<class ‘int’>`,
                instruction:
`All variables are of a specific datatype. There are integers, strings, Booleans, complex, lists, dictionaries etc. Python does not have the need to specify these datatypes when declaring a variable.
Code – 
x = hello
y = 3
z = True
Here x is of type string, y could be an integer if used for arithmetic or string if used as a character, and z is of type Boolean. 
To know the type of variable we use the type() method. The following code
Code – 
print(type(x))
will give the following output
Output – 
<class ‘bool’>
There can be times when you want to specify a type for a particular variable. This can be done through casting.
Code – 
a = “3”
b = int(3)
c = int(“3”)
d = str(x)
Here a and d are of type string and b and c and integers.`,
                tests: [
                    {
                        input: '',
                        output: `<class 'int'>`
                    }
                ]
            },
            {
                title: 'Output variables',
                statement:
`Before taking off using the emergency space shuttle, send another message to go Space Mission Operations Centre on Earth to ensure they know you are following their instructions.
Complete the following code for the following output
Code – 
shuttleName = Emergency1
planetNum = 36

Output – 
I am using Emergency1 to reach planet 36`,
                instruction:
`To print both text and a variable, python uses the concatenation (+) character. Except for strings, any other datatype must be first casted to type string in order to be able to concatenate and print.
For example:
Code – 
name = John
time = 9
print(“Hello” + name)
print(“It is ” + str(time) + “ in the morning.”)`,
                tests: [
                    {
                        input: '',
                        output: `I am using Emergency1 to reach planet 36`
                    }
                ]
            }
        ],
        [
            {
                title: 'Arithmetic operators',
                statement:
`Congratulations! You have made it to planet 36. Here you find a remote Space Centre. In order to open its door you need to code a program that does some arithmetic operations.
Use the above table to complete the following code and get the following output.
Code –
a = 5
b = 2
Instead of _ your output should have the appropriate operator
Output –
5 _ 2 = 7
5 _ 2 = 3
5 _ 2 = 10
5 _ 2 = 2
5 _ 2 = 1
5 _ 2 = 25`,
                instruction:
`+ Addition
- Subtraction
* Multiplication
/ Division
% Modulus
** Exponentiation`,
                tests: [
                    {
                        input: '',
                        output:
`5 + 2 = 7
5 - 2 = 3
5 * 2 = 10
5 / 2 = 2
5 % 2 = 1
5 ** 2 = 25`
                    }
                ]
            },
            {
                title: 'If statements 1',
                statement:
`You are inside the space centre of planet 36. You need to make sure that this centre is connected to the space centre you work for.  Write a code using if statements to receive the following output. If the space centre id is the same as the earth centre id then code will output “Same Id!” if not then “Sorry, not same!”.
You should use the variables below

Code –
spaceCentreId = 3401
earthCentreId = 3401

Output –
Same Id!`,
                instruction:
`== Equals
!= Not equals
< Less than
<= Less than equals
> Greater than
>= Greater than equals
These are used in selections and iterations. Selections in python are performed using if...else statements. For example the following code 
Code –
x = 3
y = 2
if (x>y):
    print(x)
else:
	print(y)
will have the following output
Output –
3
You may or may not include the “else” in your code. If there is more than one condition then the keyword “elif” may also be used as many times as needed. (Consult the syntax)`,
                tests: [
                    {
                        input: '',
                        output:
`Same Id!`
                    }
                ]
            },
            {
                title: 'If statements 2',
                statement:
`The last exercise told you that you are at the correct place. However the system that communicates with Earth here is outdated and requires you to add a code in the end. Your code should check whether the contents in the variable “connected” is true or not. The following outputs should be achieved when “connected” is true.
Output –
Connected: True`,
                instruction:
`Instead of using logical operators, you may want to see if something is true or not. If statements can therefore also be used in the following way.
Code –
variable1 = True
if variable1:
	//statements
or
Code –
variable1 = False
if not variable1:
	//statements`,
                tests: [
                    {
                        input: '',
                        output:
`Connected: True`
                    }
                ]
            },
            {
                title: 'If statements 3',
                statement:
`Now that you are connected to Earth, according to security protocol, they have to verify your identity. Write a mock up of a code that may help them do so. Your code should see if the content in the variable “astronaut” is true or not. If it is true then it should see if “astrId” is greater than 2000 otherwise it should print “Not verified”. If it is greater than 2000 then it should print “You are verified”, if not then it should print “Astronaut should not be on any mission”.`,
                instruction:
`In Python you can if statements inside if statements. This is called nested ifs. Following is the example for so.
Code –
x = 5
y = 2
if ((x*y)>=(x+y)):
	if (x>y):
		print(x)
	else:
		print(y)
else:
	print(x-y)`,
                tests: [
                    {
                        input: '',
                        output:
``
                    }
                ]
            },
            {
                title: 'Lists 1',
                statement:
`Congratulations! You have made it to planet 41. On this planet you find a fuel system that you can use to refill your space shuttle’s fuel. The following code is presented to you. You need to complete the code so that it prints the kind of fuel your space shuttle uses. Your shuttle uses liquid oxygen.
Code –
fuel = [“liquid oxygen”, “liquid hydrogen”, “dinitrogen tetroxide”]`,             
                instruction:
`Lists in Python is another data type used to store multiple items in a single variable and to store collections of data. They are ordered and changeable and can have duplicate values. A list in python is also indexed. The first item in the list has the index [0], the second [1] and so on. The items in a list can be of any data type.
The following code creates a list called newList and then prints its second item. 
Code –
newList = [“item1”, “item2”, “item3”]
print(newList[1])

Output -
item2`,
                tests: [
                    {
                        input: '',
                        output:
`liquid oxygen”`
                    }
                ]
            }
        ]
    ]});
}
