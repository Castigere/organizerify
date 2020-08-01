import preload from './preload';
import auth from './auth';
import user from './user';
import submit from './submit';

const selectorList = { preload, auth, user, submit };

/**
 * Function returning object of objects containing memoized selectors.
 * Code returned looks like this:
 * selectors.auth.getLoggedInUser: state => state.user.loggedInUser
 * @param {Object} selectorList
 * @returns {Object}, selectors
 */
const selectorFactory = selectorGroups => {
  const selectors = {};
  Object.keys(selectorGroups).forEach(selectorGroup => {
    selectors[selectorGroup] = { ...selectorGroups[selectorGroup] };
    Object.keys(selectorGroups[selectorGroup]).forEach(selector => {
      let cacheMap = {};
      selectors[selectorGroup][selector] = state => {
        if (cacheMap.state === state[selectorGroup]) {
          return cacheMap.result;
        }
        const result = selectorGroups[selectorGroup][selector](state[selectorGroup]);
        cacheMap = { state: state[selectorGroup], result };
        return result;
      };
    });
  });
  return selectors;
};

export default selectorFactory(selectorList);
