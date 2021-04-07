import ThreeMap from 'MainPage/ThreeMap';
import InfoCard from './InfoCard.jsx';
import Paper from '@material-ui/core/Paper'

export default function Background() {

    return(
    <Paper class="background" style={{ width: '233px', marginRight: '10px', zIndex: '-1', position: 'fixed' }}>
   

    <InfoCard/>

    <ThreeMap/>

    </Paper>
    )
}