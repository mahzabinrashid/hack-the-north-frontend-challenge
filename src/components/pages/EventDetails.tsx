import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TEvent } from "../../types/eventTypes";
import { authService } from "../../services/AuthService";

function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<TEvent | null>(null);

  useEffect(() => {
    if (eventId) {
      fetch(`https://api.hackthenorth.com/v3/events/${eventId}`)
        .then((response) => response.json())
        .then((data: TEvent) => {
          setEvent(data);
        })
        .catch((error) => {
          console.error(
            `Error fetching event details for event ID ${eventId}:`,
            error
          );
        });
    }
  }, [eventId]);

  if (!event) return <div>Loading event details...</div>;

  if (event.permission === "private" && !authService.isAuthenticated()) {
    return (
      <div>
        You do not have permission to view this event. Please{" "}
        <a href="/login">login</a> to view it.
      </div>
    );
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.event_type}</p>
      <p>{event.description}</p>
    </div>
  );
}

export default EventDetails;
