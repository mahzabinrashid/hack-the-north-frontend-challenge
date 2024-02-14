import React from "react";
import { Link } from "react-router-dom";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { TEvent } from "../../types/eventTypes";
import styled, { useTheme } from "styled-components";
import BrowserWindowGradient from "../common/UI/BrowserWindowGradient";
import formatEventType from "src/utils/FormatEventType";
import { authService } from "src/services/AuthService";
import Button from "../common/UI/Button";
import convertUnixTimeToNormal from "../../utils/dateUtils";
import { mediaQueries } from "src/utils/responsive";

interface EventListProps {
  events: TEvent[];
  onDragEnd: (result: DropResult) => void;
}

const EventListContainer = styled.div`
  margin: 40px 0px;
`;

const EventContainer = styled.div`
  padding: 40px 20px;

  ${mediaQueries.largeMobile} {
    padding: 0px 20px 40px 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  ${mediaQueries.tablet} {
    flex-direction: column;
    justify-content: center;
  }
`;

const EventList: React.FC<EventListProps> = React.memo(
  ({ events, onDragEnd }) => {
    const theme = useTheme();

    const gradientColors = [
      {
        start: theme.colors.primary.blue,
        end: theme.colors.primary.purple,
        hoverStart: theme.colors.hover.blue,
        hoverEnd: theme.colors.hover.purple,
      },
      {
        start: theme.colors.primary.orange,
        end: theme.colors.primary.pink,
        hoverStart: theme.colors.hover.orange,
        hoverEnd: theme.colors.hover.pink,
      },
      {
        start: theme.colors.primary.cyan,
        end: theme.colors.primary.blue,
        hoverStart: theme.colors.hover.cyan,
        hoverEnd: theme.colors.hover.blue,
      },
      {
        start: theme.colors.primary.orange,
        end: theme.colors.primary.yellow,
        hoverStart: theme.colors.hover.orange,
        hoverEnd: theme.colors.hover.yellow,
      },
    ];

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="events">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {events.map((event, index) => (
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
                    >
                      <EventListContainer>
                        <BrowserWindowGradient
                          gradientStartColor={
                            gradientColors[index % gradientColors.length].start
                          }
                          gradientEndColor={
                            gradientColors[index % gradientColors.length].end
                          }
                        >
                          <EventContainer>
                            <Link
                              to={`/events/${event.id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <h2
                                style={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                {event.name}
                              </h2>
                            </Link>
                            <p>
                              Timing:{" "}
                              {convertUnixTimeToNormal(
                                event.start_time,
                                event.end_time
                              )}
                            </p>
                            <p>Type: {formatEventType(event.event_type)}</p>
                            <p>Description: {event.description}</p>
                            {event.speakers && event.speakers.length > 0 && (
                              <p>
                                Speakers:{" "}
                                {event.speakers
                                  .map((speaker) => speaker.name)
                                  .join(", ")}
                              </p>
                            )}
                            {event.related_events &&
                              event.related_events.length > 0 && (
                                <p>
                                  Related events:{" "}
                                  {event.related_events
                                    .map(
                                      (id) =>
                                        events.find((e) => e.id === id)?.name
                                    )
                                    .filter((name) => name != null)
                                    .join(", ")}
                                </p>
                              )}
                            <ButtonContainer>
                              {event.public_url && (
                                <Button
                                  gradientStartColor={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].hoverStart
                                  }
                                  gradientEndColor={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].hoverEnd
                                  }
                                  hoverGradientStartColor={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].start
                                  }
                                  hoverGradientEndColor={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].end
                                  }
                                  boxShadow={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].start
                                  }
                                  width={240}
                                  aria-label="public event access link"
                                >
                                  <a
                                    href={event.public_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Event Access
                                  </a>
                                </Button>
                              )}{" "}
                              {authService.isAuthenticated() && (
                                <Button
                                  gradientStartColor={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].hoverStart
                                  }
                                  gradientEndColor={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].hoverEnd
                                  }
                                  hoverGradientStartColor={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].start
                                  }
                                  hoverGradientEndColor={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].end
                                  }
                                  boxShadow={
                                    gradientColors[
                                      index % gradientColors.length
                                    ].start
                                  }
                                  width={240}
                                  aria-label="private event access link"
                                >
                                  <a
                                    href={event.private_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Private Access (Hackers Only)
                                  </a>
                                </Button>
                              )}
                            </ButtonContainer>
                          </EventContainer>
                        </BrowserWindowGradient>
                      </EventListContainer>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

export default EventList;
