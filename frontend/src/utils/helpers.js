const doThenSetState = async (operation, args, setter) => {
  const result = await operation(args);
  console.log('getter', result);
  setter(result);
};

const nothing = () => {};

export { doThenSetState, nothing };
