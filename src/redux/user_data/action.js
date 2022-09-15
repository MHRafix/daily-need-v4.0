// store logged in user type
export const storeUser = {
  STORE_USER: "STORE_USER",
};

// store loggedin user data action
export const storeUserData = (user) => {
  return { type: storeUser.STORE_USER, payload: user };
};
