import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Landing,
  Login,
  Events,
  EventDetails,
  NotFound,
} from "./components/pages";
import Navbar from "./components/common/Layout/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
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
