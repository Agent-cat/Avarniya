import React, { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/upcoming-events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Separate events into Upcoming and Past based on today's date
  const getUpcomingAndPastEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize

    const upcoming = [];
    const past = [];

    events.forEach((category) => {
      const upcomingEvents = category.Events.filter(
        (ev) => new Date(ev.details.date) >= today
      );
      const pastEvents = category.Events.filter(
        (ev) => new Date(ev.details.date) < today
      );

      if (upcomingEvents.length > 0) {
        upcoming.push({ ...category, Events: upcomingEvents });
      }
      if (pastEvents.length > 0) {
        past.push({ ...category, Events: pastEvents });
      }
    });

    return { upcoming, past };
  };

  const { upcoming, past } = getUpcomingAndPastEvents();

  const renderCategory = (category) => (
    <div key={category.CategoryName} className="mb-10">
      <h3 className="text-2xl text-white mb-4">{category.CategoryName}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {category.Events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={event.details.image || "https://via.placeholder.com/300x200"}
              alt={event.details.title}
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="text-xl font-semibold mt-2">
              {event.details.title}
            </h4>
            <p className="text-gray-600">{event.details.date}</p>
            <p className="text-gray-500 text-sm">{event.details.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="p-6 text-center">Loading events...</div>;
  }
  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* UPCOMING EVENTS */}
      <h2 className="text-3xl text-gray-200 mb-6">Upcoming Events</h2>
      {upcoming.length > 0 ? (
        upcoming.map((category) => renderCategory(category))
      ) : (
        <p className="text-gray-500">No upcoming events</p>
      )}

      {/* PAST EVENTS */}
      <h2 className="text-3xl text-gray-200 mb-6 mt-12">Past Events</h2>
      {past.length > 0 ? (
        past.map((category) => renderCategory(category))
      ) : (
        <p className="text-gray-500">No past events</p>
      )}
    </div>
  );
}
