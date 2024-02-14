export default function formatEventType(eventType: string) {
  switch (eventType) {
    case "workshop":
      return "Workshop";
    case "tech_talk":
      return "Tech Talk";
    case "activity":
      return "Activity";
    default:
      return eventType.charAt(0).toUpperCase() + eventType.slice(1); 
  }
}


