const initialValue = {};

const errorReducer = (state = initialValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_ERROR":
      return payload;
    case "REMOVE_ERROR":
      return {};
    default:
      return state;
  }
};

export default errorReducer;
