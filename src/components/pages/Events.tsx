import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../../services/AuthService";
import { TEvent } from "../../types/eventTypes";
import convertUnixTimeToNormal from "../../utils/dateUtils";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

function Events() {
  const [events, setEvents] = useState<TEvent[]>([]); // stores complete ordered list of events
  const [displayEvents, setDisplayEvents] = useState<TEvent[]>([]); // for searching, filtering, reordering
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("");

  useEffect(() => {
    fetch("https://api.hackthenorth.com/v3/events")
      .then((response) => response.json())
      .then((data: TEvent[]) => {
        // sort events in order by start_time
        let sortedEvents = data.sort((a, b) => a.start_time - b.start_time);

        // retrieve event ordering from localStorage's eventOrder
        const savedOrderString = localStorage.getItem("eventOrder");
        let savedOrder: number[] | null = null;
        if (savedOrderString !== null) {
          savedOrder = JSON.parse(savedOrderString);
        }

        if (savedOrder && Array.isArray(savedOrder)) {
          const eventMap = new Map(
            sortedEvents.map((event) => [event.id, event])
          );

          const orderedEvents = savedOrder
            .map((id) => eventMap.get(id))
            .filter((event): event is TEvent => event !== undefined);

          if (orderedEvents.length > 0) {
            sortedEvents = orderedEvents;
          }
        }
        // only authenticated users can see private events
        const visibleEvents = authService.isAuthenticated()
          ? sortedEvents
          : sortedEvents.filter((event) => event.permission === "public");

        setEvents(visibleEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  useEffect(() => {
    // search and filter based on the event type functionality
    const filteredEvents = events.filter((event) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        event.name.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.event_type.toLowerCase().includes(query) ||
        event.speakers.some((speaker) =>
          speaker.name.toLowerCase().includes(query)
        );
      const matchesType = eventTypeFilter
        ? event.event_type === eventTypeFilter
        : true;
      return matchesSearch && matchesType;
    });

    setDisplayEvents(filteredEvents);
  }, [events, searchQuery, eventTypeFilter]);

  const onDragEnd = (result: DropResult) => {
    // react-beautiful-dnd
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const newEventsOrder = Array.from(events);
    const reorderedItem = newEventsOrder.find(
      (e) => e.id === displayEvents[source.index].id
    );

    if (!reorderedItem) {
      return;
    }
    newEventsOrder.splice(
      newEventsOrder.findIndex((e) => e.id === reorderedItem.id),
      1
    );

    const destinationIndex = events.findIndex(
      (e) => e.id === displayEvents[destination.index].id
    );
    newEventsOrder.splice(destinationIndex, 0, reorderedItem);

    setEvents(newEventsOrder);

    // save event IDs ordering to localStorage
    const eventOrder = newEventsOrder.map((event) => event.id);
    localStorage.setItem("eventOrder", JSON.stringify(eventOrder));
  };

  return (
    <div className="Events">
      <h1>Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={eventTypeFilter}
        onChange={(e) => setEventTypeFilter(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="workshop">Workshop</option>
        <option value="tech_talk">Tech Talk</option>
        <option value="activity">Activity</option>
      </select>

      <div>
        {displayEvents.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="events">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {displayEvents.map((event, index) => (
                    <Draggable
                      key={event.id}
                      draggableId={String(event.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "10px",
                            margin: "0 0 8px 0",
                            backgroundColor: "#f4f4f4",
                            borderRadius: "4px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {/*  link to view each event  */}
                          <Link
                            to={`/events/${event.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <h2>{event.name}</h2>
                          </Link>
                          <p>Type: {event.event_type}</p>
                          <p>Description: {event.description}</p>
                          <p>
                            Start Time:{" "}
                            {convertUnixTimeToNormal(event.start_time)}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default Events;
