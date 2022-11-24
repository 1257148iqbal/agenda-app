import {v4 as uuid} from 'uuid';
import { ADD_EVENT, DELETE_EVENT, SHOW_EVENT, SHOW_EVENTS, UPDATE_EVENT } from "../actionTypes";

export const addEvent = (newEvent)=>{
    return{
      type: ADD_EVENT,
      payload: {...newEvent, id: uuid()}
    }
}

export const ShowEvents = () =>  {
    return{
        type: SHOW_EVENTS
    }
}

export const ShowEvent = (id) =>  {
    return{
        type: SHOW_EVENT,
        payload: id
    }
}

export const deleteEvent = (id) =>  {
    return{
        type: DELETE_EVENT,
        payload: id
    }
}

export const updateEvent = (value, id) =>  {
    return{
        type: UPDATE_EVENT,
        payload: {value, id}
    }
}
