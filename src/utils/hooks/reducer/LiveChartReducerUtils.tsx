import type { IEvent } from "../../utils";
import type { ILiveChartReducerPayload, ILiveChartState } from "./LiveChartReducer";

interface IUpdateDisplayedEvents {
  currentDisplayedIndex: number;
  currentDisplayedEvents: IEvent[];
}

// Fonction pour mettre à jour les événements affichés basée sur l'état actuel et les événements mis à jour.
export const updateDisplayedEvents = (
  state: ILiveChartState,
  updatedEvents: IEvent[]
): IUpdateDisplayedEvents => {
  let currentDisplayedIndex = state.currentDisplayedIndex; // Index actuel pour l'affichage des événements.
  const nbTotalEvents = updatedEvents.length; // Nombre total d'événements mis à jour.
  let currentDisplayedEvents: IEvent[] = []; // Initialise la liste des événements à afficher.

  // Si l'index actuel est défini et qu'il y a des événements à afficher.
  if (currentDisplayedIndex && nbTotalEvents > 0) {
    if (!state.paused) { // Si le graphique n'est pas en pause, avance l'index.
      currentDisplayedIndex++;
    }
    // Calcule les indices de début et de fin pour les événements à afficher.
    const startIndex = Math.max(0, currentDisplayedIndex - 20);
    const endIndex = Math.min(currentDisplayedIndex, nbTotalEvents);
    // Met à jour la liste des événements à afficher.
    currentDisplayedEvents = updatedEvents.slice(startIndex, endIndex);
  } else {
    // Si aucun index specifique n'est present, affiche les 20 derniers événements.
    currentDisplayedEvents = updatedEvents.slice(
      Math.max(0, nbTotalEvents - 20),
      nbTotalEvents
    );
  }

  // Retourne l'index actuel et la liste des événements à afficher.
  return { currentDisplayedIndex, currentDisplayedEvents };
};

// Ajoute un nouvel événement à l'état et met à jour l'affichage en conséquence.
export const handleNewEvent = (
  state: ILiveChartState,
  event: IEvent
): ILiveChartState => {
  const updatedEvents = [...state.events, event]; // Ajoute le nouvel événement à la liste existante.
  // Met à jour les événements affichés avec la liste mise à jour.
  const { currentDisplayedIndex, currentDisplayedEvents } =
    updateDisplayedEvents(state, updatedEvents);

  // Retourne le nouvel état avec les événements mis à jour et les informations d'affichage.
  return {
    ...state,
    events: updatedEvents,
    currentDisplayedIndex,
    currentDisplayedEvents,
  };
};

// Gère la navigation dans le graphique, mettant le graphique en pause et définissant l'index courant.
export const handleSetNavigation = (
  state: ILiveChartState,
  payload: ILiveChartReducerPayload
): ILiveChartState => {
  const updatedState = {
    ...state,
    paused: true, // Met le graphique en pause.
    currentDisplayedIndex: payload?.currentDisplayedIndex, // Définit l'index courant pour l'affichage.
  };

  // Met à jour les événements affichés avec le nouvel état.
  return {
    ...updatedState,
    ...updateDisplayedEvents(updatedState, state.events),
  };
};

// Gère la synchronisation du graphique, reprenant les mises à jour en direct et réinitialisant l'index.
export const handleSetSync = (state: ILiveChartState): ILiveChartState => {
  const updatedState = {
    ...state,
    paused: false, // Reprend les mises à jour en direct.
    currentDisplayedIndex: null, // Réinitialise l'index.
  };

  // Met à jour les événements affichés avec le nouvel état.
  return {
    ...updatedState,
    ...updateDisplayedEvents(updatedState, state.events),
  };
};

// Gère la mise en pause du graphique, changeant l'état de pause et l'index courant si nécessaire.
export const handleSetPause = (
  state: ILiveChartState,
  payload: ILiveChartReducerPayload
): ILiveChartState => {
  // Met à jour l'état de pause et l'index courant.
  return {
    ...state,
    paused: payload?.paused,
    currentDisplayedIndex: payload?.currentDisplayedIndex ?? state.currentDisplayedIndex,
  };
};

// Gère la mise à jour d'un événement, enregistrant les modifications et mettant à jour l'affichage.
export const handleUpdateEvent = (
  state: ILiveChartState,
  payload: ILiveChartReducerPayload
): ILiveChartState => {
  const updatedState = {
    ...state,
    updatedValues: state.updatedValues.some(
      (value) =>
        value.index === state.editState.index &&
        value.field === state.editState.field
    )
      ? [...state.updatedValues]
      : [...state.updatedValues, { ...state.editState }],
    editState: null,
    events: state.events.map((event) => {
      if (event.index === payload?.event?.index) {
        return {
          ...event,
          ...payload?.event,
        };
      }
      return event;
    }),
  };

  // Met à jour les événements affichés avec le nouvel état.
  return {
    ...updatedState,
    ...updateDisplayedEvents(updatedState, updatedState.events),
  };
};

// Gère la définition de l'événement en cours d'édition, mettant le graphique en pause et ajustant l'index.
export const handleSetEditingEvent = (
  state: ILiveChartState,
  payload: ILiveChartReducerPayload
): ILiveChartState => {
  // Met le graphique en pause et ajuste l'index pour l'édition.
  return {
    ...state,
    editState: payload?.editState,
    paused: true,
    currentDisplayedIndex: state.currentDisplayedIndex || state.events.length,
  };
};

// Réinitialise les valeurs mises à jour après l'édition d'événements.
export const handleResetUpdatedValues = (state: ILiveChartState) => {
  
  const updatedState = {
    ...state,
    events: state.events.map((event) => {
      const updatedValues = state.updatedValues.filter(
        (updatedValue) => updatedValue.index === event.index
      );
      if (updatedValues?.length) {
        updatedValues.forEach((updatedValue) => {
          event[updatedValue.field] = updatedValue.value;
        });
      }
      return event;
    }),
    updatedValues: [],
  };

  // Met à jour les événements affichés avec le nouvel état.
  return {
    ...updatedState,
    ...updateDisplayedEvents(updatedState, updatedState.events),
  };
};