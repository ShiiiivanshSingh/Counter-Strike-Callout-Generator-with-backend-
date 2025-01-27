import React, { useState, useEffect } from "react";
import MapDisplay from "./components/MapDisplay"; 
import "./App.css";
import topographyPattern from './assets/topography.svg';
import { FaSun, FaMoon, FaUndo, FaTimes, FaGithub, FaTwitter, FaLinkedin, FaBomb, FaCrosshairs, FaSkull, FaBars } from 'react-icons/fa';

const mapNameDisplay = {
  'de_dust2': 'Dust 2',
  'de_inferno': 'Inferno',
  'de_mirage': 'Mirage',
  'de_nuke': 'Nuke Upper',
  'de_nuke_lower': 'Nuke Lower',
  'de_train': 'Train',
  'de_overpass': 'Overpass',
  'de_ancient': 'Ancient',
  'de_vertigo': 'Vertigo Upper',
  'de_vertigo_lower': 'Vertigo Lower',
  'de_cache': 'Cache',
  'de_cbble': 'Cobblestone',
  'de_tuscan': 'Tuscan',
  'de_bank': 'Bank',
  'de_eyes': 'Eyes',
  'de_dust': 'Dust',
  'de_forge': 'Forge',
  'de_lake': 'Lake',
  'de_aztec': 'Aztec',
  'de_rats': 'Rats',
  'de_grind': 'Grind',
  'de_prodigy': 'Prodigy',
  'de_sugarcane': 'Sugarcane',
  'de_stmarc': 'St. Marc',
  'de_baggage': 'Baggage',
  'de_lighthouse': 'Lighthouse',
  'de_paradise': 'Paradise',
  'de_climate': 'Climate',
  'de_crossfire': 'Crossfire',
  'de_cobble': 'Cobblestone',
  'de_tside': 'T Side'
};

const mapDescriptions = {
  'de_dust2': "Set in a Middle Eastern town inspired by Morocco and Tunisia. The iconic double doors at mid have been the site of countless legendary AWP battles.",
  'de_inferno': "Located in a Mediterranean village in Italy. The bell in T spawn actually works and can be shot to ring!",
  'de_mirage': "Based on a traditional Moroccan medina, featuring authentic architecture and a bustling marketplace.",
  'de_nuke': "Set in a German nuclear power facility. One of the few maps with significant vertical gameplay across multiple floors.",
  'de_nuke_lower': "The underground reactor section of the German nuclear facility, featuring authentic industrial design.",
  'de_train': "Based on a Soviet-era train yard in Russia. The trains were actually destructible in earlier versions.",
  'de_overpass': "Located in Berlin, Germany, featuring the iconic Kreuzberg canal and water treatment plant.",
  'de_ancient': "Set in a lost Aztec city deep in the jungle, featuring authentic Mesoamerican architecture and symbols.",
  'de_vertigo': "High-rise skyscraper under construction in a modern city. You can see the entire city skyline from the edges.",
  'de_vertigo_lower': "Lower construction levels of the skyscraper, featuring realistic construction site layouts.",
  'de_cache': "Located in Pripyat, Ukraine near Chernobyl. Designed based on real exclusion zone references.",
  'de_cbble': "Set in a historic English castle, inspired by the real Chillon Castle in Switzerland.",
  'default': "A classic Counter-Strike map with its own unique setting and atmosphere."
};

const csgoQuotes = [
  "Rush B, don't stop!",
  "The bomb has been planted.",
  "Enemy spotted!",
  "Fire in the hole!",
  "Sneaky beaky like",
  "Doors stuck! DOORS STUCK!",
  "Ez for ENCE",
  "What up brother",
  "They talk about my one taps",
  "You don't fake",
  "Are we rushing in, or are we going sneaky beaky like?",
  "Boom! Headshot!",
  "Green, what's your problem?",
  "Everyone is dead!",
  "Saving? Really?",
];

function App() {
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });
  const [showSizeSlider, setShowSizeSlider] = useState(false);
  const [mapSize, setMapSize] = useState(100);
  const [currentQuote, setCurrentQuote] = useState(() => {
    return csgoQuotes[Math.floor(Math.random() * csgoQuotes.length)];
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('/.netlify/functions/getCall');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (!data.data || data.data.length === 0) {
        setError('No maps available.');
        return;
      }

      const maps = data.data.map(callout => ({
        name: callout.mapName,
        displayName: mapNameDisplay[callout.mapName] || callout.mapName,
        src: callout.src,
        hotspots: callout.hotspots
      }));

      setMaps(maps);
      setSelectedMap(maps[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load maps. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const lightStyle = {
    backgroundColor: '#f5ebe0',
    backgroundImage: `url(${topographyPattern})`,
    backgroundSize: '600px 600px',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'soft-light',
  };

  const darkStyle = {
    backgroundColor: '#14213d',
    backgroundImage: `url(${topographyPattern})`,
    backgroundSize: '600px 600px',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'soft-light',
  };

  const backgroundStyle = isDarkMode ? darkStyle : lightStyle;

  const rotateQuote = () => {
    let newQuote;
    do {
      newQuote = csgoQuotes[Math.floor(Math.random() * csgoQuotes.length)];
    } while (newQuote === currentQuote);
    setCurrentQuote(newQuote);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={backgroundStyle}>
        <div className="text-center p-8 bg-opacity-50 rounded-lg backdrop-blur-md border border-white border-opacity-20">
          <h2 className="text-2xl text-white mb-4">⚠️ Error</h2>
          <p className="text-white mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="px-6 py-2 bg-[#ffb703] text-white rounded-lg hover:bg-[#fb8500] transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={backgroundStyle}>
        <div className="text-center">
          <div className="spinner mb-8"></div>
          <p className="text-4xl font-bold text-white animate-pulse">
            Loading Maps...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-screen max-w-[100vw] overflow-x-hidden transition-colors duration-300 ${isDarkMode ? 'dark' : 'light'}`} style={backgroundStyle}>
      {/* Theme Toggle and Menu Buttons */}
      <div className="fixed top-4 right-4 flex items-center gap-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-md
                   border border-white border-opacity-20 transition-all duration-300
                   hover:bg-opacity-30"
        >
          {isDarkMode ? (
            <FaSun className="text-white text-xl" />
          ) : (
            <FaMoon className="text-[#14213d] text-xl" />
          )}
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-md
                   border border-white border-opacity-20 transition-all duration-300
                   hover:bg-opacity-30 relative"
        >
          <FaBars className={`text-xl ${isDarkMode ? 'text-white' : 'text-[#14213d]'}`} />
        </button>

        {/* Menu Panel */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-black/90 backdrop-blur-md rounded-lg shadow-lg border border-white/10 overflow-hidden">
            <div className="p-4">
              <div className="space-y-4">
                <a
                  href="https://github.com/ShiiiivanshSingh/Counter-Strike-Map-Callout-Guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-[#ffb703] transition-all p-2 rounded-lg hover:bg-white/5"
                >
                  <FaGithub className="text-xl" />
                  <span>View on GitHub</span>
                </a>
                <a
                  href="https://x.com/de_mirage_fan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-[#ffb703] transition-all p-2 rounded-lg hover:bg-white/5"
                >
                  <FaTwitter className="text-xl" />
                  <span>Follow on Twitter</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/shivansh-pratap-singh-23b3b92b1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-[#ffb703] transition-all p-2 rounded-lg hover:bg-white/5"
                >
                  <FaLinkedin className="text-xl" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  Made by sh1vansh
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 transform transition-all duration-300 hover:scale-105">
          <h1 className={`text-6xl font-bold mb-6 hover:text-[#ffb703] transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-[#14213d]'}`}>
            Counter Strike Callouts
          </h1>
          <p className={`text-xl max-w-2xl mx-auto hover:text-[#ffb703] transition-all duration-300 ${isDarkMode ? 'text-white' : 'text-[#14213d]'}`}>
            Because every callout tells a tale.
          </p>
        </div>

        {/* Map Selection */}
        <div className="max-w-4xl mx-auto bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur-md border border-[#14213d] border-opacity-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-[#14213d]'}`}>
                Select Your Map
              </h2>
              <select
                value={selectedMap?.name || ''}
                onChange={(e) => {
                  const selected = maps.find(map => map.name === e.target.value);
                  setSelectedMap(selected);
                }}
                className="w-full px-4 py-3 bg-[#219ebc] text-white rounded-lg 
                           border border-white border-opacity-40
                           focus:outline-none focus:ring-2 focus:ring-[#ffb703]"
              >
                {maps.map((map) => (
                  <option 
                    key={map.name} 
                    value={map.name}
                    className="bg-[#219ebc] text-white"
                  >
                    {map.displayName}
                  </option>
                ))}
              </select>
              <p className="text-white text-sm opacity-80">
                {maps.length} maps available
              </p>
            </div>

            {/* Preview or Info */}
            <div className="text-white space-y-4">
              <h3 className="text-xl font-bold">
                {selectedMap?.displayName || 'Select a map'}
              </h3>
              <p className="text-white opacity-80">
                {mapDescriptions[selectedMap?.name] || mapDescriptions.default}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('map-display').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-6 py-2 bg-[#ffb703] text-white rounded-lg 
                           hover:bg-[#fb8500] transition-all duration-300"
                >
                  View Callouts
                </button>
                <button
                  onClick={() => setShowSizeSlider(!showSizeSlider)}
                  className="w-full sm:w-auto px-6 py-2 bg-[#219ebc] text-white rounded-lg 
                           hover:bg-[#1d8aa8] transition-all duration-300"
                >
                  Adjust Map Size
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Display Section */}
      {selectedMap && (
        <div id="map-display" className="w-full px-4 overflow-hidden">
          {/* Size Controls */}
          {showSizeSlider && (
            <div className="max-w-sm mx-auto">
              <div className="p-4 bg-black/80 rounded-lg backdrop-blur-md shadow-lg relative">
                <button
                  onClick={() => setShowSizeSlider(false)}
                  className="absolute top-2 right-2 text-white hover:text-[#fb8500] transition-all"
                  aria-label="Close"
                >
                  <FaTimes className="text-lg" />
                </button>
                <div className="flex items-center gap-4 mb-2">
                  <button
                    onClick={() => setMapSize(100)}
                    className="p-2 bg-[#219ebc] text-white rounded-lg 
                             hover:bg-[#1d8aa8] transition-all"
                    aria-label="Reset size"
                  >
                    <FaUndo className="text-lg" />
                  </button>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={mapSize}
                    onChange={(e) => setMapSize(parseInt(e.target.value))}
                    className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-4
                             [&::-webkit-slider-thumb]:h-4
                             [&::-webkit-slider-thumb]:bg-white
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-webkit-slider-thumb]:shadow-lg
                             [&::-webkit-slider-thumb]:hover:bg-[#ffb703]
                             [&::-webkit-slider-thumb]:transition-colors
                             [&::-moz-range-thumb]:w-4
                             [&::-moz-range-thumb]:h-4
                             [&::-moz-range-thumb]:bg-white
                             [&::-moz-range-thumb]:border-none
                             [&::-moz-range-thumb]:rounded-full
                             [&::-moz-range-thumb]:cursor-pointer
                             [&::-moz-range-thumb]:shadow-lg
                             [&::-moz-range-thumb]:hover:bg-[#ffb703]
                             [&::-moz-range-thumb]:transition-colors"
                  />
                </div>
                <div className="text-sm text-white text-center">
                  Map Size: {mapSize}%
                </div>
              </div>
            </div>
          )}
          <div className="mt-4 overflow-hidden" style={{ transform: `scale(${mapSize / 100})`, transformOrigin: 'top center', transition: 'transform 0.3s ease' }}>
            <MapDisplay map={selectedMap} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full mt-16 bg-black/40 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-12 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Left Column - Social Links */}
            <div className="text-center md:text-left transform transition-transform hover:scale-105">
              <h3 className="text-white text-xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                <FaCrosshairs className="text-[#ffb703]" />
                Connect With Me
              </h3>
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://github.com/ShiiiivanshSingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#ffb703] transition-all transform hover:scale-110"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://x.com/de_mirage_fan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#ffb703] transition-all transform hover:scale-110"
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shivansh-pratap-singh-23b3b92b1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#ffb703] transition-all transform hover:scale-110"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>

          
            <div className="text-center transform transition-transform hover:scale-105">
              <h3 className="text-white text-xl font-bold mb-4 flex items-center justify-center gap-2">
                <FaBomb className="text-[#ffb703]" />
                Lingo-Strike
              </h3>
              <div 
                className="text-white/80 p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-all"
                onClick={rotateQuote}
              >
                <p className="hover:text-[#ffb703] transition-colors text-lg">
                  "{currentQuote}"
                </p>
              </div>
            </div>

            {/* Right Column - Credits */}
            <div className="text-center md:text-right transform transition-transform hover:scale-105">
              <h3 className="text-white text-xl font-bold mb-4 flex items-center justify-center md:justify-end gap-2">
                Credits
                <FaSkull className="text-[#ffb703]" />
              </h3>
              <div className="text-white/80 space-y-2">
                <p className="hover:text-[#ffb703] transition-colors">Made with ❤️ for the CS community</p>
                <p className="text-sm hover:text-[#ffb703] transition-colors">
                  All map callouts are still in works.
                </p>
                <p className="text-xs text-white/60 hover:text-[#ffb703] transition-colors">
                  by sh1vansh
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;