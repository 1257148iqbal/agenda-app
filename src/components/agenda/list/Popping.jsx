import { Modal, Button } from "react-bootstrap";
import "../../../style/model.scss";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../../redux/action";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { updateEvent } from "../../../redux/action/index";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

//schema to validate event inputs
const schema = yup
  .object({
    title: yup.string().required("Can't Be Empty"),
    start: yup.date().required("Please specify the time to start"),
    end: yup
      .date("must be a valid date")
      .required("on update you must specify an end date"),
  })
  .required();

const Popping = ({ open, handleClose, event }) => {
  //#region Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(({ errorReducer }) => errorReducer);
  //#endregion Hooks

  //#region State
  const [dbError, setError] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [fromDate, setFromDate] = useState(new Date());


  //#endregion State

  useEffect(() => {
    if (error && !firstRender) {
      setError(error);
    }
    if (!error.start && !error.end && dbError !== false) {
      setTimeout(navigate("/"), 300);
    }
  }, [dbError, error, firstRender, navigate]);

  const handleDelete = () => {
    dispatch(deleteEvent(event.id));
    handleClose(!open);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: event?.title,
      start: new Date(event?.start),
      end: new Date(event?.end),
      describe: event?.describe
        ? event?.describe
        : "No description was provided",
    },
  });

  
  const onChange = (date)=>{
    setFromDate(date)
  }

  const onSubmit = (values) => {
    setFirstRender(false);
    dispatch(updateEvent(values, event.id));
    setTimeout(() => handleClose(!open), 500);
  };

  return (
    <div>
      <Modal Modal show={open} onHide={handleClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" align-content-center m-5"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-capitalize">
              <div className="mb-4">
                <label htmlFor="title" className="form-label">
                  Event Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="title"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                />
                <p
                  className={`error text-warning position-absolute ${
                    errors.title ? "active" : ""
                  }`}
                >
                  {errors.title ? (
                    <i className="bi bi-info-circle me-2"></i>
                  ) : (
                    ""
                  )}
                  {errors.title?.message}
                </p>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-4" style={{ zIndex: "100" }}>
              <label htmlFor="start" className="form-label">
                Start Date
              </label>
              {/* start date controller*/}
              <Controller
                control={control}
                name="start"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    minDate={new Date()}
                    onSelect={date=>onChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                    id="start"
                  />
                )}
              />
              {/* error handling */}
              <p
                className={`error text-warning position-absolute ${
                  errors.start ? "active" : ""
                }`}
              >
                {errors.start ? (
                  <i className=" bi bi-info-circle me-2"></i>
                ) : (
                  ""
                )}
                {errors.start?.message}
              </p>
              <p
                className={`error text-warning position-absolute ${
                  dbError.start ? "" : "d-none"
                }`}
              >
                {dbError.start ? (
                  <i className=" bi bi-info-circle me-2"></i>
                ) : (
                  ""
                )}
                {dbError.start}
              </p>
            </div>

            <div className="mb-4" style={{ zIndex: "100" }}>
              <label htmlFor="end" className="form-label">
                End Date
              </label>
              {/* end date controller*/}
              <Controller
                control={control}
                name="end"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select end date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    minDate={fromDate}
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showTimeSelect
                    className="form-control"
                    id="end"
                  />
                )}
              />
              {/* error handling */}
              <p
                className={`error text-warning position-absolute ${
                  errors.end ? "active" : ""
                }`}
              >
                {errors.end ? <i className=" bi bi-info-circle me-2"></i> : ""}
                {errors.end?.message}
              </p>
              <p
                className={`error text-warning position-absolute ${
                  dbError.end ? "" : "d-none"
                }`}
              >
                {dbError.end ? <i className=" bi bi-info-circle me-2"></i> : ""}
                {dbError.end}
              </p>

              <div className="mb-4">
                <label htmlFor="describe" className="form-label">
                  Event Description{" "}
                  <span className="text-danger small">(optional)</span>
                </label>
                <input
                  {...register("describe")}
                  type="text"
                  placeholder="describe your event"
                  className="form-control"
                  id="describe"
                  aria-describedby="describe"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="success">
              Update
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Popping;
