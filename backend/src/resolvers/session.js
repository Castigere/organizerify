export default {
  Query: {
    getSessionStatus: async (_parent, _args, { isAuth }) => ({
      isSessionActive: isAuth
    })
  }
};
