import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const url = import.meta.env.VITE_API_URL;
  const [events, setEvents] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (showSuccessPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showSuccessPopup]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(${url}/api/events);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCategoryClick = (chartIndex, catIndex) => {
    const categoryId = ${chartIndex}-${catIndex};
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleRegisterClick = async (categoryId, event) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        ${url}/api/events/${categoryId}/events/${event._id}/register,
        {
          method: "POST",
          headers: {
            Authorization: Bearer ${token},
            'Content-Type': 'application/json'
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.conflictingEvent) {
          setError(Time Conflict: You are already registered for "${data.conflictingEvent.title}" at ${data.conflictingEvent.time} on ${data.conflictingEvent.date});
        } else {
          setError(data.message || "Failed to register for event");
        }
        return;
      }

      setShowSuccessPopup(true);
      setError(null);
      setRegistrationStatus(prev => ({
        ...prev,
        [event._id]: true
      }));

    } catch (error) {
      setError("An error occurred while registering for the event");
    }
  };

  const handleUnregisterClick = async (categoryId, event) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        ${url}/api/events/${categoryId}/events/${event._id}/unregister,
        {
          method: "DELETE",
          headers: {
            Authorization: Bearer ${token},
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      const updatedEvents = events.map((category) => {
        if (category._id === categoryId) {
          const updatedEvents = category.Events.map((e) => {
            if (e._id === event._id) {
              return {
                ...e,
                registeredStudents: e.registeredStudents.filter(
                  (id) => id !== localStorage.getItem("userId")
                ),
              };
            }
            return e;
          });
          return { ...category, Events: updatedEvents };
        }
        return category;
      });
      setEvents(updatedEvents);
      setShowSuccessPopup(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-700">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-200 mb-2">Success!</h3>
          <p className="text-gray-400 mb-6">You're all set! See you at the event!</p>
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="w-full bg-gray-700 text-gray-200 px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-6xl font-bold text-center text-gray-200 mb-20 mt-16">
          Our Events
        </h1>

        {error ? (
          <div className="text-red-400 text-center p-6 bg-red-900/10 rounded-2xl">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {events.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-400 border-b-2 border-gray-700 pb-2">
                  {category.categoryName}
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {category.Events?.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 hover:bg-gray-900/80 transition-all duration-300 cursor-pointer"
                      onClick={() => handleCategoryClick(categoryIndex, eventIndex)}
                    >
                      <div className="relative">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-gray-200 px-3 py-1 rounded-full text-sm">
                          {event.registeredStudents.length}/{event.participantLimit} spots
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-200 mb-2">{event.title}</h3>

                      <div className={`space-y-3 transition-all duration-300 ${expandedCategory === ${categoryIndex}-${eventIndex} ? 'block' : 'hidden'}`}>
                        <p className="text-gray-400">{event.details.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                          <div>
                            <p className="font-medium">Venue</p>
                            <p>{event.details.venue}</p>
                          </div>
                          <div>
                            <p className="font-medium">Date</p>
                            <p>{event.details.date}</p>
                          </div>
                          <div>
                            <p className="font-medium">Start Time</p>
                            <p>{event.details.startTime}</p>
                          </div>
                          <div>
                            <p className="font-medium">End Time</p>
                            <p>{event.details.endTime}</p>
                          </div>
                        </div>

                        {event.registeredStudents.includes(localStorage.getItem("userId")) ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnregisterClick(category._id, event);
                            }}
                            className="w-full mt-4 bg-gray-700 text-gray-200 px-4 py-2 rounded-xl hover:bg-gray-600 transition-all duration-300"
                          >
                            Unregister
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRegisterClick(category._id, event);
                            }}
                            disabled={event.registeredStudents.length >= event.participantLimit}
                            className={`w-full mt-4 px-4 py-2 rounded-xl transition-all duration-300 ${event.registeredStudents.length >= event.participantLimit
                              ? "bg-gray-700 cursor-not-allowed"
                              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                              }`}
                          >
                            {event.registeredStudents.length >= event.participantLimit ? "Event Full" : "Register"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default Events;
