import React from "react";
import { PauseRounded, PlayArrowRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface IPlayButtonProps {
  paused: boolean;
  onPause: () => void;
}

export const PlayButton: React.FC<IPlayButtonProps> = ({ paused, onPause }) => {
  return (
    <div className="play-button text-base">
      <IconButton
        className="p-0"
        aria-label={paused ? "play" : "pause"}
        onClick={() => onPause()}
      >
        {paused ? (
          <PlayArrowRounded className="p-0" />
        ) : (
          <PauseRounded className="p-0" />
        )}
      </IconButton>
    </div>
  );
};
