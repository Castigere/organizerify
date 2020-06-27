export default {
  Query: {
    getUserAccountType: async (_parent, { email }, { models }) => {
      const document = await models.UserMongoSchema.findOne({ email });
      if (document) {
        return {
          email,
          type: document.type,
          exists: true
        };
      }
      return { email, exists: false };
    }
  }
};
