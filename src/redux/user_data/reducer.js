import { storeUser } from "./action";

const initialState = {
  loggedin_user: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case storeUser.STORE_USER: {
      return { ...state, loggedin_user: payload };
    }

    default:
      return state;
  }
}
