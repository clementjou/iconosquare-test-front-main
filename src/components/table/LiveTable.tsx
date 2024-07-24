import React from "react";
import { useLiveChartContext } from "../../utils/hooks/useLiveChartContext";
import { IEvent } from "../../utils/utils";
import ValueField from "./LiveTableValueField";
import { Button } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

interface ILiveTableProps { }

const LiveTable: React.FC<ILiveTableProps> = () => {
  const { data, dispatch } = useLiveChartContext();

  const [editValue, setEditValue] = React.useState<number>(
    data?.editState?.value
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // transformer un nombre
    setEditValue(parseInt(e.target.value, 10));
  };

  const handleValueClick = (index: number, field: string, value: number) => {
    setEditValue(value);

    dispatch({
      type: "set_editing_event",
      payload: {
        editState: {
          index,
          field,
          value,
        },
      },
    });
  };

  const handleSubmit = (index: number, field: string) => {
    // Recherche l'événement à mettre à jour par son index dans la liste des événements.
    const updatedEvent = data?.events?.find(
      (event: IEvent) => event.index === index
    );
    // Vérifie si l'événement a été trouvé.
    if (updatedEvent) {
      // Met à jour la valeur du champ spécifié de l'événement avec la nouvelle valeur.
      // Utilise editValue si disponible, sinon utilise la valeur actuelle de l'état d'édition.
      updatedEvent[field] = editValue || data.editState?.value;
      // Envoie une action pour mettre à jour l'événement dans le store global avec la nouvelle valeur.
      dispatch({
        type: "update_event",
        payload: {
          event: updatedEvent,
        },
      });
    }
    // Réinitialise la valeur d'édition à null après la mise à jour.
    setEditValue(null);
  };

  const nbTotalEvents = data?.events?.length ?? 0;
  const eventsFiltered = data?.currentDisplayedEvents?.length
    ? data.currentDisplayedEvents
    : data?.events?.slice(Math.max(0, nbTotalEvents - 20), nbTotalEvents) ?? [];

  const renderFields = (event: IEvent) => {
    const valueFields = Object.keys(event).filter((key) =>
      key.startsWith("value")
    );

    return (
      <div key={event.index} className="border-l border-gray-300 flex-1">
        <div className="p-2">{event.index}</div>
        {valueFields.map((field: string) => (
          <ValueField
            key={field}
            event={event}
            field={field}
            handleValueClick={handleValueClick}
            isEditing={
              data?.editState?.index === event.index &&
              data?.editState?.field === field
            }
            editValue={editValue || data?.editState?.value}
            handleInputChange={(e) => handleInputChange(e)}
            handleSubmit={handleSubmit}
          />
        ))}
      </div>
    );
  };

  const restoreValues = () => {
    dispatch({
      type: "reset_updated_values",
    });
  }

  return (
    <div className="live-table-container">
      <div className="live-table-actions flex flex-row-reverse">
        <Button
          disabled={!data.updatedValues?.length}
          onClick={() => restoreValues()}
          variant="outlined"
          startIcon={<HistoryIcon />}
        >
          <span className="text-xs">Revert modifications</span>
        </Button>
      </div>
      <div className="live-table">
        <div className="my-5 flex border border-gray-300 rounded">
          <div>
            <div className="p-2">Index</div>
            <div className="p-2 border-t border-gray-300">Value 1</div>
            <div className="p-2 border-t border-gray-300">Value 2</div>
          </div>
          {eventsFiltered.map((event) => renderFields(event))}
        </div>
      </div>
    </div>
  );
};

LiveTable.propTypes = {};

export default LiveTable;
