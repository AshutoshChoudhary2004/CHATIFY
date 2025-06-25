import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { currentSong, isPlaying } = usePlayerStore();

  // handle song changes
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (!currentSong) {
      audioRef.current.currentTime = 0;
      return;
    }

    const audio = audioRef.current;
    audio.src = currentSong.audioUrl;
    console.log("audio : ", audio.src);
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  return currentSong ? <audio ref={audioRef} /> : null;
};
export default AudioPlayer;
