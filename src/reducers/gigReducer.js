export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    cat: "design",
    cover: "",
    images: [],
    fileLink:"",
    desc: "",
    shortTitle: "",
    shortDesc: "",
    features: [],
    price: 0,
  };
  
  export const gigReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_INPUT":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "ADD_IMAGES":
        return {
          ...state,
          cover: action.payload.cover,
          images: action.payload.images,
          fileLink: action.payload.file,

        }; 
      case "ADD_FEATURE":
        return {
          ...state,
          features: [...state.features, action.payload],
        };
      case "REMOVE_FEATURE":
        return {
          ...state,
          features: state.features.filter(
            (feature) => feature !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };