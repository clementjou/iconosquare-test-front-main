import React, { useContext, useReducer, createContext } from "react";
import { createRandomEvent } from "../utils";
import liveChartReducer, {
  ILiveChartReducerPayload,
  ILiveChartState,
} from "./reducer/LiveChartReducer";

const LiveChartContext = createContext<{
  data: ILiveChartState;
  dispatch: React.Dispatch<{
    type: string;
    payload?: ILiveChartReducerPayload;
  }>;
}>({
  data: {
    events: [],
    currentDisplayedIndex: 0,
    currentDisplayedEvents: [],
    updatedValues: [],
    paused: false,
    editState: null,
  },
  dispatch: () => { },
});

const intialEventsAmount = 50;

const initialEvents = Array.from(Array(intialEventsAmount)).map(
  (_, ix) => createRandomEvent(ix + 1)?.event
);

const initialData: ILiveChartState = {
  events: initialEvents,
  currentDisplayedIndex: 0,
  currentDisplayedEvents: initialEvents.slice(
    intialEventsAmount - 20,
    intialEventsAmount
  ),
  paused: false,
  editState: null,
  updatedValues: [],
};

const LiveChartProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, dispatch] = useReducer(liveChartReducer, initialData);
  return (
    <LiveChartContext.Provider value={{ data, dispatch }}>
      {children}
    </LiveChartContext.Provider>
  );
};

const useLiveChartContext = () => {
  const context = useContext(LiveChartContext);
  if (!context) {
    throw new Error(
      "useLiveChartContext must be used within a LiveChartProvider"
    );
  }
  return context;
};

export { LiveChartProvider, useLiveChartContext };
