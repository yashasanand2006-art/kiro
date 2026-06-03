import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import '../styles/MusicPlayer.css';

interface Song {
  id: number;
  title: string;
  url: string;
}

const songs: Song[] = [
  { id: 1, title: "Barbaad", url: "/songs/Barbaad.mp3" },
  { id: 2, title: "Evarini Adaganu", url: "/songs/Evarini Adaganu.mp3" },
  { id: 3, title: "The Way I Loved You", url: "/songs/The Way I Loved You.mp3" },
  { id: 4, title: "Hello Hello", url: "/songs/Hello Hello.mp3" },
  { id: 5, title: "I See the Light", url: "/songs/I See the Light.mp3" },
  { id: 6, title: "For the First Time in Forever", url: "/songs/For the First Time in Forever.mp3" },
  { id: 7, title: "I Thought I Saw Your Face Today", url: "/songs/I Thought I Saw Your Face Today.mp3" },
];

const MusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Playback failed:", err);
          // If play fails (e.g. user interaction required), sync state back
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  return (
    <div className="music-player-container">
      <audio ref={audioRef} src={currentSong.url} loop />
      
      <div className="relative">
        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
        >
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <div className="music-waves">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              <Music className="w-5 h-5" />
            )}
            <span className="song-title-display">
              {isPlaying ? currentSong.title : "Play Music"}
            </span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </motion.button>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="music-dropdown"
            >
              <div className="dropdown-header">
                <Volume2 className="w-4 h-4 text-white/60" />
                <span>Select a Song</span>
              </div>
              
              <div className="song-list">
                {songs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => handleSongSelect(song)}
                    className={`song-item ${currentSong.id === song.id ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      {currentSong.id === song.id && isPlaying ? (
                        <Pause className="w-4 h-4 text-pink-500" />
                      ) : (
                        <Play className="w-4 h-4 text-white/40" />
                      )}
                      <span className="truncate">{song.title}</span>
                    </div>
                    {currentSong.id === song.id && isPlaying && (
                      <div className="playing-dot" />
                    )}
                  </button>
                ))}
              </div>

              <div className="dropdown-footer">
                 <button onClick={togglePlay} className="control-btn">
                   {isPlaying ? <Pause /> : <Play />}
                   <span>{isPlaying ? "Pause" : "Resume"}</span>
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MusicPlayer;
