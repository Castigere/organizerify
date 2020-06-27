const subsciptionLogger = data => {
  const date = new Date().toLocaleTimeString('de-DE');
  const typeName = Object.keys(data)[0];
  const resultsName = Object.keys(data[typeName])[0];
  const message = data[typeName][resultsName];
  console.groupCollapsed(
    `%cgraphql %csubscription %cmessage %c${typeName} %c@ ${date}`,
    'color: gray; font-weight: lighter',
    'color: black; font-weight: bold; color: darkblue',
    'color: gray; font-weight: lighter',
    'color: black; font-weight: bold',
    'color: gray; font-weight: lighter'
  );
  console.log(message.__typename.toUpperCase());
  Object.keys(message).forEach(key => {
    if (typeof message[key] === 'object') {
      console.log(`    ${key.toUpperCase()}`);
      Object.keys(message[key]).forEach(innerKey => {
        console.log(
          `%c|%c   ${innerKey}: %c${message[key][innerKey]}`,
          'color: darkblue; font-weight: bold',
          'color: gray; font-weight: lighter',
          'color: black; font-weight: bold'
        );
      });
    } else {
      console.log(
        `%c${key}: %c${message[key]}`,
        'color: gray; font-weight: lighter',
        'color: black; font-weight: bold'
      );
    }
  });
  console.groupEnd();
};

export default subsciptionLogger;
