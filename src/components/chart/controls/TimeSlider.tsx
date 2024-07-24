import * as React from "react";
import Slider from "@mui/material/Slider";



interface ITimeSliderProps {
  start: number;
  end: number;
  lastDisplayedIndex: number;
  onChange: (index: number) => void;
}

const TimeSlider: React.FC<ITimeSliderProps> = ({
  onChange,
  start,
  end,
  lastDisplayedIndex
}) => {

  const [value, setValue] = React.useState<number>(lastDisplayedIndex);

  const onSliderChange = (index: number) => {
    setValue(index);
    onChange(index);
  };

  React.useEffect(() => {
    setValue(lastDisplayedIndex);
  }, [lastDisplayedIndex]);

  return (
    <Slider
      step={1}
      value={value || end}
      className="time-slider"
      valueLabelDisplay="auto"
      min={start}
      max={end}
      onChange={(event, value) => setValue(value as number)}
      onChangeCommitted={(event, value) => onSliderChange(value as number)}
    />
  );
};

export default TimeSlider;
