import React from 'react';
import { IEvent } from '../../utils/utils';

interface IValueFieldProps {
  event: IEvent;
  field: string;
  isEditing: boolean;
  editValue: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (index: number, field: string) => void;
  handleValueClick: (index: number, field: string, value: number) => void;

}
const ValueField: React.FC<IValueFieldProps> = ({
  event,
  field,
  isEditing,
  editValue,
  handleInputChange,
  handleSubmit,
  handleValueClick
}) => {
  const value = event[field] as number;

  if (isEditing) {
    return (
      <input
        type="number"
        className={'p-2 border-t w-32'}
        value={editValue}
        onChange={handleInputChange}
        onBlur={() => handleSubmit(event.index, field)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(event.index, field);
          }
        }}
        autoFocus
      />
    );
  }

  return (
    <div
      className="p-2 border-t border-gray-300 cursor-pointer"
      onClick={() => handleValueClick(event.index, field, value)}
    >
      {value}
    </div>
  );
};

export default ValueField;