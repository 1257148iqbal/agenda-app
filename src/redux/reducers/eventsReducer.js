import * as moment from "moment";
import { ADD_EVENT, SHOW_EVENTS, DELETE_EVENT, UPDATE_EVENT } from "../actionTypes";

const initialValue = {
  agenda: [],
};

const eventsReducer = (state = initialValue, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_EVENTS:
      return {...state, agenda: state.agenda?.map(item=>({
        ...item,
        start: moment(item.start).format("ddd DD MMM YY LT"),
        end: moment(item.end).format("ddd DD MMM YY LT")
      }))};
    case ADD_EVENT:
      return { ...state, agenda: [...state.agenda, payload] };

      case DELETE_EVENT:
       const events= state.agenda.filter(item=>item.id !== payload);
        return {
          ...state,
          agenda: events
        };

    case UPDATE_EVENT:
    const renderedEvents = state.agenda.filter(event => event.id !== payload.id);
    return {
        ...state,
        agenda:[...renderedEvents, payload.value],
        
    }
    default:
      return state;
  }
};

export default eventsReducer;
