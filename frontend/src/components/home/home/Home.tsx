import "./Home.css";
import AppointmentImageSource from '../../../assets/images/appointments.jpg';

function Home(): JSX.Element {

    return (
        <div className="Home">
            <h2>This is a website to make an appointment for development groups</h2>

            <img alt="" src={AppointmentImageSource}/>
        </div>
    );
}

export default Home;
