import React from "react";
import type { IEvent } from "../../../utils/utils";
import TimeSlider from "./TimeSlider";
import { PlayButton } from "./buttons/Play";
import { LiveButton } from "./buttons/Live";
import type { ILiveChartReducerPayload } from "../../../utils/hooks/reducer/LiveChartReducer";

interface ILiveChartControlsProps {
  events: IEvent[];
  eventsToDisplay: IEvent[];
  paused: boolean;
  currentDisplayedIndex: number;
  dispatch: React.Dispatch<{ type: string; payload: ILiveChartReducerPayload }>;
}

const LiveChartControls: React.FC<ILiveChartControlsProps> = ({
  events,
  dispatch,
  paused,
  currentDisplayedIndex,
}) => {
  const onPause = () => {
    if (!paused && !currentDisplayedIndex) {
      currentDisplayedIndex = events?.length;
    }
    dispatch({
      type: "set_pause",
      payload: {
        paused: !paused,
        currentDisplayedIndex: currentDisplayedIndex,
      },
    });
  };

  const onSyncLive = () => {
    dispatch({
      type: "set_sync",
      payload: {},
    });
  };

  const onTimeLineChange = (index: number) => {
    dispatch({
      type: "set_navigation",
      payload: {
        currentDisplayedIndex: index,
      },
    });
  };

  return (
    <div className="controls flex items-center px-6">
      <div className="actions w-2/12 flex items-center	">
        <PlayButton paused={paused} onPause={onPause} />
        <LiveButton
          isSync={!currentDisplayedIndex}
          paused={paused}
          onSyncLive={onSyncLive}
        />
      </div>
      <div className="timeline w-10/12">
        <TimeSlider
          start={events?.[0].index}
          lastDisplayedIndex={currentDisplayedIndex}
          end={events.length}
          onChange={onTimeLineChange}
        />
      </div>
    </div>
  );
};

export default LiveChartControls;
