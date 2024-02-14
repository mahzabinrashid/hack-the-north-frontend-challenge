import { useEffect, useState } from "react";
import { authService } from "../../services/AuthService";
import { TEvent } from "../../types/eventTypes";
import { DropResult } from "react-beautiful-dnd";
import EventSearchFilter from "../events/EventSearchFilter";
import EventList from "../events/EventList";
import ContentWrapper from "../common/Layout/ContentWrapper";
import SectionContainer from "../common/Layout/SectionContainer";
import HeaderWithGlow from "../common/UI/HeaderWithGlow";
import theme from "src/styles/theme";

const Events: React.FC = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [displayEvents, setDisplayEvents] = useState<TEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("");

  useEffect(() => {
    fetch("https://api.hackthenorth.com/v3/events")
      .then((response) => response.json())
      .then((data: TEvent[]) => {
        let sortedEvents = data.sort((a, b) => a.start_time - b.start_time);
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

    const eventOrder = newEventsOrder.map((event) => event.id);
    localStorage.setItem("eventOrder", JSON.stringify(eventOrder));
  };

  return (
    <ContentWrapper>
      <SectionContainer>
        <HeaderWithGlow text="Events" color={theme.colors.primary.cyan} />
        <EventSearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          eventTypeFilter={eventTypeFilter}
          setEventTypeFilter={setEventTypeFilter}
        />
        {displayEvents.length > 0 ? (
          <EventList events={displayEvents} onDragEnd={onDragEnd} />
        ) : (
          <p>No events found.</p>
        )}
      </SectionContainer>
    </ContentWrapper>
  );
};

export default Events;
