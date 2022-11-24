import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popping from "./Popping";
import { useDispatch, useSelector } from "react-redux";
import { ShowEvents } from "../../../redux/action";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = () => {
  //#region Hooks
  const dispatch = useDispatch();
  const { agenda } = useSelector(({ eventsReducer }) => eventsReducer);
  //#endregion Hooks

  //#region State

  const [open, setOpen] = useState(false);
  const [renderStatus, rerender] = useState(false);
  const [event, SetEvent] = useState();
  //#endregion State

  useEffect(() => {
    dispatch(ShowEvents());
  }, [dispatch, renderStatus]);


  const openEventClick = (event) => {
    if (event.id) {
      SetEvent(event);
      setOpen(true);
    }
  };

  const closeEventClick = () => {
    setOpen(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={agenda}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: 50, fontFamily: "Patrick Hand" }}
        onSelectEvent={openEventClick}
      />
      {open && event.id && <Popping
        open={open}
        handleOpen={openEventClick}
        handleClose={closeEventClick}
        renderStatus={renderStatus}
        rerender={rerender}
        event={event}
      />}
      
    </div>
  );
};

export default MyCalendar;
