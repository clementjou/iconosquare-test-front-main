import type { IEvent } from "../../utils";
import {
  handleNewEvent,
  handleResetUpdatedValues,
  handleSetEditingEvent,
  handleSetNavigation,
  handleSetPause,
  handleSetSync,
  handleUpdateEvent,
} from "./LiveChartReducerUtils";

export interface IEditState {
  index: number;
  field: string;
  value: number;
  oldValue?: number;
}

export interface ILiveChartReducerPayload {
  event?: IEvent;
  currentDisplayedEvents?: IEvent[];
  currentDisplayedIndex?: number;
  paused?: boolean;
  editState?: IEditState;
  updatedValues?: IEditState[];
}

export interface ILiveChartState {
  events: IEvent[];
  currentDisplayedEvents: IEvent[];
  currentDisplayedIndex: number;
  paused: boolean;
  editState: IEditState;
  updatedValues: IEditState[];
}

const liveChartReducer = (
  state: ILiveChartState,
  action: { type: string; payload?: ILiveChartReducerPayload }
): ILiveChartState => {
  switch (action.type) {
    // Gère l'ajout d'un nouvel événement au graphique en direct.
    case "new_event":
      return handleNewEvent(state, action.payload?.event as IEvent);
    // Gère la mise en pause ou la reprise du graphique en direct.
    case "set_pause":
      return handleSetPause(state, action?.payload);
    // Gère la navigation dans le graphique en direct.
    case "set_navigation":
      return handleSetNavigation(state, action?.payload);
    // Gère la synchronisation du graphique en direct, reprenant les mises à jour en temps réel après une pause.
    case "set_sync":
      return handleSetSync(state);
    // Gère la mise à jour d'un événement existant dans le graphique en direct.
    case "update_event":
      return handleUpdateEvent(state);
    // Gère la sélection d'un événement pour l'édition dans le graphique en direct.
    case "set_editing_event":
      return handleSetEditingEvent(state, action?.payload);
    // Réinitialise les valeurs qui ont été mises à jour pendant l'édition d'un événement.
    case "reset_updated_values":
      return handleResetUpdatedValues(state);
    // Gère les cas où le type d'action n'est pas reconnu, ce qui indique une erreur dans le code.
    default:
      // Lance une erreur pour signaler un type d'action non géré.
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default liveChartReducer;
