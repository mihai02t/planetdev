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
import PubSub from 'pubsub-js';

export type InfoCardProps = {
  currentPlanet: number;
  
};

function getSteps() {
    return ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
}

const InfoCard = (props: InfoCardProps) => {
    const [activeStep, setActiveStep] = React.useState(props.currentPlanet);
    const [currentStep, setCurrentStep] = React.useState(props.currentPlanet+1)
    const steps = getSteps();
    var pastStep = currentStep;

    // handle planet switching
    const title = ['title0', 'title1', 'title2']
    const description = ['desc0', 'desc1', 'desc2']

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
      
      console.log(currentStep)
      var data = [pastStep, currentStep]
      PubSub.publish('cameraSwitch', data);
      
      setCardTitle(title[currentStep-1])
      setCardDescription(description[currentStep-1])
    

      console.log("The current Planet is: " + currentStep)
    }
    

   
    return (
      <Paper className="selectcard" style={{ width: '35%', marginLeft: '50%', marginTop: '20%', zIndex: 1, position: 'fixed' }}>
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
          <Button size="small">Continue journey</Button>
        </CardActions>
        </Card>
      </Paper>
    );
  }

export default InfoCard;
