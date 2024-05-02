/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function AudioPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  console.log({ audioSrc });

  return (
    <div>
      <button onClick={togglePlayPause}>
        {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
      </button>
      <audio ref={audioRef} src={audioSrc} onEnded={handleEnded} />
    </div>
  );
}
