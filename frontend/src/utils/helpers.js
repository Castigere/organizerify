const doThenSetState = async (operation, args, setter) => {
  const result = await operation(args);
  console.log('getter', result);
  setter(result);
};

const trimWhitespaces = string => string.replace(/ /g, '');

export { doThenSetState, trimWhitespaces };
