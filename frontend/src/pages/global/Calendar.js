import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importer les styles de react-calendar
import "../../styles/Calendar.css";

const CalendarPage = () => {
    const { me } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [event, setEvent] = useState('');
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleEventChange = (e) => {
        setEvent(e.target.value);
    };

    const handleAddEvent = () => {
        if (event.trim()) {
            setEvents([...events, { date: selectedDate.toDateString(), event }]);
            setEvent('');
        }
    };

    // Ajouter un événement sur la date sélectionnée
    const tileClassName = ({ date, view }) => {
        const eventDates = events.map((e) => new Date(e.date).toDateString());
        if (view === 'month' && eventDates.includes(date.toDateString())) {
            return 'highlighted-event';
        }
        return '';
    };

    return (
        <div>
            <Navbar />
            {/* <h1>Bienvenue {me ? `${me.firstname} ${me.lastname}` : "Utilisateur"} !</h1> */}

            <div className="calendar-container">
                {/* Calendrier à gauche */}
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        prev2Label={null}
                        next2Label={null}
                        prevLabel="‹"
                        nextLabel="›"
                        tileClassName={tileClassName}
                    />

                {/* Formulaire à droite pour ajouter un événement */}
                <div className="form-container">
                    <h3>Ajouter un événement</h3>
                    <input
                        type="text"
                        placeholder="Titre de l'événement"
                        value={event}
                        onChange={handleEventChange}
                    />
                    <Button onClick={handleAddEvent} text="Ajouter l'événement" />

                    <div className="events-list">
                        <h4>Événements :</h4>
                        {events
                            .filter((e) => new Date(e.date).toDateString() === selectedDate.toDateString())
                            .map((e, index) => (
                                <p key={index}>{e.event}</p>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CalendarPage;
