"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Shukuru",
    artist: "0uassel",
    src: "music/Shukuru - 99 bpm - A min - ( Sample - Pharoah Sanders Shukuru ) [X] .mp3",
    cover:
      "/covers/file_00000000117461f787bb6b4b6b027edf_conversation_id=67fc383d-e91c-8003-af1b-c043df532edb&message_id=435487f0-be1c-4307-91a8-01a0b86c046e.webp",
  },

  {
    id: 2,
    title: "Olympusc",
    artist: "0uassel",
    src: "/music/Olympusc.mp3",
    cover: "/covers/Olympusc.webp",
  },

  {
    id: 3,
    title: "Music Of The Spheres",
    artist: "0uassel",
    src: "/music/Music Of The Spheres.mp3",
    cover: "/covers/spheres.webp",
  },

  {
    id: 4,
    title: "Heartbreak Anniversary",
    artist: "0uassel",
    src: "/music/1 db less finalll  Heartbreak Anniversary - 140 BPM - Cm - No Agony, Markk Aylin.mp3",
    cover: "/covers/heartbreak.webp",
  },

  {
    id: 5,
    title: "Can't believe u",
    artist: "0uassel",
    src: "/music/Can't believe u.mp3",
    cover: "/covers/Cant believe u.webp",
  },

  {
    id: 6,
    title: "Lustfulness",
    artist: "0uassel, Ediba Deville",
    src: "music/lustfulness.mp3",
    cover: "/covers/lustfulness.webp",
  },
  {
    id: 7,
    title: "Take My Stress",
    artist: "0uassel",
    src: "/music/Take My Stress.mp3",
    cover: "/covers/take my stress.webp",
  },
  {
    id: 8,
    title: "Don´t Go",
    artist: "0uassel",
    src: "/music/Don´t Go.mp3",
    cover: "/covers/dont go.webp",
  },
  {
    id: 9,
    title: "Paradise",
    artist: "0uassel",
    src: "/music/Paradise.mp3",
    cover: "/covers/paradise.webp",
  },

  {
    id: 10,
    title: "Remembrance",
    artist: "0uassel",
    src: "/music/Remembrance.mp3",
    cover: "/covers/remembarnce.webp",
  },
  {
    id: 11,
    title: "Spring",
    artist: "0uassel, lilgebbi",
    src: "/music/spring.mp3",
    cover: "/covers/spring.webp",
  },
];

export default function MusicRadio() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audio.currentTime = newTime;
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects - Pure B&W gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-white/3 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/2 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Starry effect */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-white rounded-full opacity-20 animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-32 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse delay-700"></div>
        <div className="absolute top-64 left-1/3 w-1 h-1 bg-white rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-white rounded-full opacity-35 animate-pulse delay-500"></div>
        <div className="absolute top-20 right-1/4 w-1 h-1 bg-white rounded-full opacity-25 animate-pulse delay-200"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full opacity-45 animate-pulse delay-800"></div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-transparent via-gray-900/10 to-gray-800/20 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4">
            &Oslash; FM
          </h1>
          {/* <p className="text-xl text-gray-400">By @0uassel</p> */}
        </header>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Now Playing Section */}
          <div className="space-y-8">
            {/* Album Art */}
            <div className="relative">
              <div className="w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-gray-800">
                <img
                  src={tracks[currentTrack].cover || "/covers/unknown.webp"}
                  alt={tracks[currentTrack].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              {/* Subtle white glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 to-white/5 blur-xl -z-10 animate-pulse"></div>
            </div>

            {/* Track Info */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {tracks[currentTrack].title}
              </h2>
              <p className="text-xl text-gray-500">
                {tracks[currentTrack].artist}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div
                className="w-full h-2 bg-gray-900 rounded-full cursor-pointer overflow-hidden border border-gray-800"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full transition-all duration-300"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6">
              <button
                onClick={prevTrack}
                className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-110 hover:border-gray-600 shadow-lg shadow-black/50"
              >
                <SkipBack className="w-6 h-6 text-gray-300" />
              </button>

              <button
                onClick={togglePlay}
                className="p-6 rounded-full bg-gradient-to-br from-white to-gray-300 hover:from-gray-100 hover:to-gray-400 transition-all duration-300 hover:scale-110 shadow-lg shadow-black/50 border border-gray-600"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-black" />
                ) : (
                  <Play className="w-8 h-8 ml-1 text-black" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-110 hover:border-gray-600 shadow-lg shadow-black/50"
              >
                <SkipForward className="w-6 h-6 text-gray-300" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center space-x-4">
              <Volume2 className="w-5 h-5 text-gray-500" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                className="w-32 h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer slider border border-gray-800"
              />
            </div>
          </div>

          {/* Playlist */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center lg:text-left bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Playlist
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                    index === currentTrack
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-600 shadow-lg shadow-black/30"
                      : "bg-gradient-to-r from-gray-950 to-black hover:from-gray-900 hover:to-gray-950 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-700">
                      <img
                        src={track.cover || "/covers/unknown.webp"}
                        alt={track.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate text-gray-200">
                        {track.title}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {track.artist}
                      </p>
                    </div>
                    {index === currentTrack && isPlaying && (
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-gradient-to-t from-white to-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-4 bg-gradient-to-t from-white to-gray-400 rounded-full animate-pulse delay-100"></div>
                        <div className="w-1 h-4 bg-gradient-to-t from-white to-gray-400 rounded-full animate-pulse delay-200"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={tracks[currentTrack].src}
          preload="metadata"
        />
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ffffff, #d1d5db);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
          border: 1px solid #374151;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ffffff, #d1d5db);
          cursor: pointer;
          border: 1px solid #374151;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #6b7280, #374151);
          border-radius: 3px;
          border: 1px solid #111827;
        }
      `}</style>
    </div>
  );
}
