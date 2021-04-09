import ThreeGame from '../../../../Three/ThreeGame';
import InfoCard from '../InfoCard';
import Paper from '@material-ui/core/Paper'

const Background = () => {
    return (
        <Paper className="background" style={{ width: '233px', marginRight: '10px', zIndex: -1, position: 'fixed' }}>
            <InfoCard/>
            <ThreeGame/>
        </Paper>
    );
};

export default Background;