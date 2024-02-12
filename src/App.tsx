import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Landing,
  Login,
  Events,
  EventDetails,
  NotFound,
} from "./components/pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
