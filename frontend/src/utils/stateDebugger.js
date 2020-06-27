const stateDebugger = (state, actionHistory) => {
  const date = new Date().toLocaleTimeString('de-DE');
  const action = actionHistory[actionHistory.length - 1];
  if (action) {
    console.groupCollapsed(
      `%caction %c${action.group}/${action.action} %c@ ${date}`,
      'color: gray; font-weight: lighter',
      'color: black; font-weight: bold',
      'color: gray; font-weight: lighter'
    );
    if (action.data) {
      Object.keys(action.data).forEach(key => {
        console.log(
          `%c${key}: %c${action.data[key]}`,
          'color: gray; font-weight: lighter',
          'color: black; font-weight: bold'
        );
      });
    }
    console.log('NEW STATE:', state);
    console.groupEnd();
  }
};

export default stateDebugger;
