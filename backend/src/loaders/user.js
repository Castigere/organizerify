export const batchUsers = async (keys, models) => {
  const users = await models.UserMongoSchema.find({
    _id: {
      $in: keys
    }
  });

  return keys.map(key => users.find(user => user.id === key));
};

export const nothingYet = () => {};
