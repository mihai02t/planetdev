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

export type InfoCardProps = {
  currentPlanet: number;
};

function getSteps() {
    return ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
}

const InfoCard = (props: InfoCardProps) => {
    const [activeStep, setActiveStep] = React.useState(props.currentPlanet);
    const steps = getSteps();
    return (
      <Paper className="selectcard" style={{ width: '30%', marginLeft: '60%', marginTop: '20%', zIndex: 1, position: 'fixed' }}>
        <Card >
        <CardContent>
          <Typography  color="textSecondary" gutterBottom>
            Python Route: Planet 1
          </Typography>
          <Typography variant="h5" component="h2">
            Chapter 1
          </Typography>
          <Typography  color="textSecondary">
            this is the brief description of chapter 1
          </Typography>
          <Typography variant="body2" component="p">
            This is the detailed description of chapter 1: <br/>
            * what the player will learn?<br/>
            * what the learning route is like?<br/>
            * How is the difficulty distribution?<br/>
            * What is the background story of this chapter?<br/>
            This is the detailed description of chapter 1: <br/>
            * what the player will learn?<br/>
            * what the learning route is like?<br/>
            * How is the difficulty distribution?<br/>
            * What is the background story of this chapter?<br/>
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
          <Button size="small">Switch</Button>
          <Button size="small">Continue journey</Button>
        </CardActions>
        </Card>
      </Paper>
    );
  }

export default InfoCard;
