import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TEvent } from "../../types/eventTypes";
import { authService } from "../../services/AuthService";
import convertUnixTimeToNormal from "src/utils/dateUtils";
import formatEventType from "src/utils/FormatEventType";
import { mediaQueries } from "src/utils/responsive";
import styled from "styled-components";
import theme from "src/styles/theme";
import Button from "../common/UI/Button";
import ContentWrapper from "../common/Layout/ContentWrapper";
import SectionContainer from "../common/Layout/SectionContainer";
import GlowText from "../common/UI/GlowText";

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

function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<TEvent | null>(null);
  const [events, setEvents] = useState<TEvent[]>([]);

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
      fetch("https://api.hackthenorth.com/v3/events")
        .then((response) => response.json())
        .then((events: TEvent[]) => {
          setEvents(events);
        })
        .catch((error) => console.error("Failed to fetch events:", error));
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
      <ContentWrapper>
        <SectionContainer>
          <GlowText color={theme.colors.primary.cyan}>
            <h2>{event.name}</h2>
          </GlowText>
          <p>
            Timing: {convertUnixTimeToNormal(event.start_time, event.end_time)}
          </p>
          <p>Type: {formatEventType(event.event_type)}</p>
          <p>Description: {event.description}</p>
          {event.speakers && event.speakers.length > 0 && (
            <p>
              Speakers:{" "}
              {event.speakers.map((speaker) => speaker.name).join(", ")}
            </p>
          )}
          {event.related_events && event.related_events.length > 0 && (
            <p>
              Related events:{" "}
              {event.related_events
                .map((id) => events.find((e) => e.id === id)?.name)
                .filter((name) => name != null)
                .join(", ")}
            </p>
          )}
          <ButtonContainer>
            {event.public_url && (
              <Button
                gradientStartColor={theme.colors.hover.blue}
                gradientEndColor={theme.colors.hover.cyan}
                hoverGradientStartColor={theme.colors.primary.blue}
                hoverGradientEndColor={theme.colors.primary.cyan}
                boxShadow={theme.colors.primary.cyan}
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
                gradientStartColor={theme.colors.hover.blue}
                gradientEndColor={theme.colors.hover.cyan}
                hoverGradientStartColor={theme.colors.primary.blue}
                hoverGradientEndColor={theme.colors.primary.cyan}
                boxShadow={theme.colors.primary.cyan}
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
        </SectionContainer>
      </ContentWrapper>
    </div>
  );
}

export default EventDetails;
