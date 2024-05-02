import { useState, useEffect, useRef } from "react";

const useAudioPlayer = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioUrl));

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioUrl);
    setIsPlaying(false);
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (isPlaying) {
      console.log("main");
      audioRef.current.pause();
    } else {
      console.log("pause");
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const setAudio = (newAudioUrl) => {
    console.log({ newAudioUrl });
    setAudioUrl(newAudioUrl);
  };

  console.log({ audioUrl });

  return { isPlaying, togglePlayPause, setAudio };
};

export default useAudioPlayer;
