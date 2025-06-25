import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initPlaylist: (songs: Song[]) => void;
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,

  initPlaylist: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: songs ? songs[0] : null,
      currentIndex: 0,
    });
  },

  setCurrentSong: (song: Song) => {
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;

    const currentSong = get().currentSong;
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity:
          willStartPlaying && currentSong
            ? `Playing ${currentSong.title} by ${currentSong.artist}`
            : "Idle",
      });
    }

    set({
      isPlaying: willStartPlaying,
    });
  },

  playNext: () => {
    if (get().queue.length === 1) return;
    const { currentIndex, queue } = get();
    const nextIndex = (currentIndex + 1) % queue.length;

    const nextSong = queue[nextIndex];

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
      });
    }
    set({
      currentSong: nextSong,
      currentIndex: nextIndex,
      isPlaying: false,
    });
  },
  playPrevious: () => {
    if (get().queue.length === 1) return;
    const { currentIndex, queue } = get();
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length; // Wrap around if negative

    const prevSong = queue[prevIndex];

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
      });
    }

    set({
      currentSong: prevSong,
      currentIndex: prevIndex,
      isPlaying: false,
    });
  },
  setIsPlaying : (isPlaying : boolean) => set({isPlaying : isPlaying})
}));
