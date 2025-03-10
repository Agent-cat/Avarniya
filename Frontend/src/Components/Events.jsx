import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const url = import.meta.env.VITE_API_URL;
  const [events, setEvents] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  useEffect(() => {
    if (showRegisterPopup || showSuccessPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRegisterPopup, showSuccessPopup]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}/api/events`);
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
    const categoryId = `${chartIndex}-${catIndex}`;
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleRegisterClick = (categoryId, event) => {
    setSelectedEvent({ ...event, categoryId });
    setShowRegisterPopup(true);
  };

  const handleUnregisterClick = async (categoryId, event) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${url}/api/events/${categoryId}/events/${event._id}/unregister`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleRegistrationSubmit = async () => {
    if (!acceptedTerms) {
      setError("Please accept the terms and conditions");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${url}/api/events/${selectedEvent.categoryId}/events/${selectedEvent._id}/register`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.conflictingEvent) {
          setError(`Time Conflict: You are already registered for "${data.conflictingEvent.title}" at ${data.conflictingEvent.time} on ${data.conflictingEvent.date}`);
        } else {
          setError(data.message || "Failed to register for event");
        }
        return;
      }

      setShowRegisterPopup(false);
      setShowSuccessPopup(true);
      setError(null);
      setRegistrationStatus(prev => ({
        ...prev,
        [selectedEvent._id]: true
      }));

    } catch (error) {
      setError("An error occurred while registering for the event");
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

  const RegisterPopup = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-3xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700">
        <h3 className="text-3xl font-bold text-gray-200 mb-6">
          {selectedEvent?.title}
        </h3>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6">
            <h4 className="text-xl font-semibold text-gray-200 mb-4">
              Terms and Conditions
            </h4>
            <div className="space-y-3 text-gray-400">
              {selectedEvent?.termsandconditions ? (
                selectedEvent.termsandconditions.split('.').filter(term => term.trim()).map((term, index) => (
                  <p key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    {term.trim()}
                  </p>
                ))
              ) : (
                <>
                  <p className="flex items-start"><span className="mr-2">•</span>Follow all event guidelines</p>
                  <p className="flex items-start"><span className="mr-2">•</span>Arrive 30 minutes early</p>
                  <p className="flex items-start"><span className="mr-2">•</span>Bring valid ID</p>
                  <p className="flex items-start"><span className="mr-2">•</span>Judges' decisions are final</p>
                  <p className="flex items-start"><span className="mr-2">•</span>No misbehavior tolerated</p>
                </>
              )}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="w-5 h-5 rounded border-gray-600 text-gray-500 focus:ring-gray-500"
            />
            <span className="text-gray-400 group-hover:text-gray-200 transition-colors">
              I accept the terms and conditions
            </span>
          </label>

          {error && (
            <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 text-red-400">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleRegistrationSubmit}
              disabled={!acceptedTerms}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300
                ${!acceptedTerms
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setShowRegisterPopup(false);
                setSelectedEvent(null);
                setAcceptedTerms(false);
                setError(null);
              }}
              className="px-6 py-3 rounded-xl font-medium border-2 border-gray-700 text-gray-400 hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
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

                      <div className={`space-y-3 transition-all duration-300 ${expandedCategory === `${categoryIndex}-${eventIndex}` ? 'block' : 'hidden'}`}>
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

      {showRegisterPopup && <RegisterPopup />}
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default Events;
