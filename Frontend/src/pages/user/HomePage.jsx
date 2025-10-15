import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook

const mapContainerStyle = { width: "100%", height: "300px" };

export default function HomePage() {
  // Use the global state from AuthContext
  const { user, isAuthenticated, logout } = useAuth(); 
  
  const [position, setPosition] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // This useEffect is now only for geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setPosition({ lat: 13.0827, lng: 80.2707 }),
        { enableHighAccuracy: true }
      );
    } else {
      setPosition({ lat: 13.0827, lng: 80.2707 }); // Default position
    }
  }, []);

  const handleLogout = () => {
    logout(); // Use the logout function from context
    // No need to navigate here, ProtectedRoute will handle it
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center rounded-b-3xl">
        <div className="text-2xl font-bold text-indigo-600">RideMart</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/profile" className="hover:text-indigo-600">Profile</Link>
          <Link to="/help" className="hover:text-indigo-600">Help & Support</Link>
          <Link to="/history" className="hover:text-indigo-600">Ride History</Link>

          {/* Use 'isAuthenticated' from context */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90"
            >
              {/* Use 'user.email' from context */}
              Logout ({user?.email}) 
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90"
            >
              Login / Signup
            </Link>
          )}
        </div>
        
        {/* ... (rest of your mobile menu and page content remains the same) ... */}
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 focus:outline-none text-2xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-b-3xl py-4 px-6 flex flex-col gap-4">
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Profile</Link>
            <Link to="/help" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Help & Support</Link>
            <Link to="/history" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">Ride History</Link>

            {isAuthenticated ? (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90"
              >
                Logout ({user?.email})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:opacity-90"
              >
                Login / Signup
              </Link>
            )}
        </div>
       )}

      {/* Header and Main Card Content... */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-extrabold">
          🚗 Welcome to <span className="text-indigo-600">RideMart</span>
        </h1>
        <p className="text-gray-600">Your one-stop ride-sharing app!</p>
      </header>
      <div className="flex justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl w-full">
            <h2 className="text-center text-indigo-600 font-bold text-2xl mb-6">Book. Ride. Enjoy.</h2>

            {googleMapsApiKey && position ? (
              <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={position} zoom={14}>
                  <Marker position={position} />
                </GoogleMap>
              </LoadScript>
            ) : (
              <div className="text-center text-red-500 p-4">
                ⚠️ Loading map or API key missing
              </div>
            )}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                <Link
                  to="/book-ride"
                  className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:opacity-95 text-center"
                >
                  🚘 Book a Ride
                </Link>
                <Link
                  to="/track"
                  className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:opacity-95 text-center"
                >
                  📍 Track Ride
                </Link>
            </div>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-500 opacity-80 py-4 mt-10">
        © {new Date().getFullYear()} RideMart | Making every ride safer 🚦
      </footer>
    </div>
  );
}