import { QUERY_LIMIT } from '../config';

export const toCursorHash = string => Buffer.from(string).toString('base64');

export const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii');

/**
 * Function performes paginated queries on mongodb collections based on provided arguments.
 * If no limit or cursor is provided a default query is returned.
 * @param {String} id
 * @param {Int} limit
 * @param {String} collection
 * @param {Object} models
 */

const queryCollectionWithPagination = async (
  { cursor, id, limit = QUERY_LIMIT },
  { models },
  collection
) => {
  const query = {};
  if (cursor) query.createdAt = { $lt: fromCursorHash(cursor) };
  if (id) query.resourceId = id;
  const documents = await models[collection].find(query, null, {
    sort: { createdAt: -1 },
    limit: limit + 1
  });
  const hasNextPage = documents.length > limit;
  const edges = hasNextPage ? documents.slice(0, -1) : documents;
  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor: toCursorHash(edges[edges.length - 1].createdAt.toString())
    }
  };
};

const createUserInDb = async (args, UserMongoSchema) => {
  const { email, password, mobileNumber, firstName, middleName, lastName, role } = args;
  try {
    const document = await UserMongoSchema.findOne({ email });
    if (document) throw new Error('User already exists');
    const newUser = new UserMongoSchema({
      email: email || '',
      mobileNumber: mobileNumber || '',
      firstName: firstName || '',
      middleName: middleName || '',
      lastName: lastName || '',
      displayName: firstName || '',
      status: 'incomplete',
      language: 'en',
      type: 'local',
      role: role || 'member'
    });
    newUser.password = newUser.generateHash(password);
    await newUser.save();
    return newUser;
  } catch (err) {
    throw err;
  }
};

const createUserSession = (newUser, req) => req.login(newUser, err => err);

export { queryCollectionWithPagination, createUserInDb, createUserSession };
