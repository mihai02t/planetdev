import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { useHistory } from 'react-router-dom';
import { VOYAGE_PATH } from '../../../Voyage';
import PubSub from 'pubsub-js';

export type InfoCardProps = {
  currentPlanet: number;
  solved: number[];
};

function getSteps() {
    return ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
}

const InfoCard = (props: InfoCardProps) => {
    const [activeStep, setActiveStep] = React.useState(props.solved[props.currentPlanet]);
    const [currentStep, setCurrentStep] = React.useState(props.currentPlanet+2)
    const steps = getSteps();
    const history = useHistory();

    let pastStep = currentStep;
    // handle planet switching
    const title = ['PLANET 1 - Jupiter', 'PLANET 2 - Mars', 'PLANET 3 - Moon']
    const description = [
      'Welcome Astronaut! You were on the way back to Earth from a lone mission and crashed on this planet. Your spaceship is in no shape to be used for travel. Following are some basic challenges to form your bases in python. Solve the challenges to proceed to the next planet.',
      'The next challenges have some arithmetic and logical operations. Along with that you will form your understanding of one of the main programming constructs - selection. Continue solving challenges to proceed to the next planet.',
      'The next challenges will teach you how to form lists and dictionaries in python. Each challenge introduces different functionality that makes it easier to construct logic. Continue solving challenges to proceed to Earth.'
    ];
    const InitializeCardTitle = (flag: any) => {
      
      return title[flag]
    }
    const InitializeCardDescription = (flag: any) => {
      
      return description[flag]
    }
    
    const [CardTitle, setCardTitle] = React.useState(InitializeCardTitle(props.currentPlanet))
    const [CardDescription, setCardDescription] = React.useState(InitializeCardDescription(props.currentPlanet))
    const handleSwitch = () => {
      
      pastStep = currentStep;
      setCurrentStep(currentStep%3 + 1)
      setActiveStep(props.solved[currentStep - 1])
      
      console.log(currentStep)
      let data = [pastStep, currentStep]
      console.log(data)
      PubSub.publish('cameraSwitch', data);
      
      setCardTitle(title[currentStep-1])
      setCardDescription(description[currentStep-1])
    
      console.log("The current Planet is: " + currentStep)
    }
    
    return (
      <Paper className="selectcard" style={{ width: '37%', marginLeft: '60%', marginTop: '20%', zIndex: 1, position: 'fixed' }}>
        <Card >
        <CardContent>
          <Typography  color="textSecondary"  gutterBottom>
            
          </Typography>
          <Typography variant="h5" component="h2" style = {{textAlign: 'left'}}>
          {CardTitle}
          </Typography>
          <Typography  color="textSecondary" style = {{textAlign: 'left'}}>

          </Typography>
          <Typography variant="body2" component="p" style = {{textAlign: 'left'}}>
          {CardDescription}
          </Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={handleSwitch}>Switch Planet</Button>
          <Button onClick={() => { console.log(currentStep - 2); history.push(VOYAGE_PATH.split(':')[0] + `${currentStep - 2}`) }} size="small">Continue journey</Button>
        </CardActions>
        </Card>
      </Paper>
    );
  }

export default InfoCard;
