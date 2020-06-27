import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

const parseQueryString = string => {
  const queryObj = gql`
    ${string}
  `;
  return [
    queryObj.definitions[0].name
      ? queryObj.definitions[0].name.value
      : 'Generic',
    queryObj.definitions[0].selectionSet.selections[0].name.value,
    string.trim()
  ];
};

const consoleLogger = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  const operationType = operation.query.definitions[0].operation;
  const { variables } = operation
  const [schemaName, queryName, query] = parseQueryString(
    operation.query.loc.source.body
  );

  if (operationType === 'subscription') {
    const date = new Date().toLocaleTimeString('de-DE');
    console.groupCollapsed(
      `%cgraphql %c${operationType} %c${schemaName}::%c${queryName} %c@ ${date}`,
      'color: gray; font-weight: lighter',
      'color: black; font-weight: bold; color: darkblue',
      'color: gray; font-weight: lighter',
      'color: black; font-weight: bold',
      'color: gray; font-weight: lighter'
    );
    if (variables) {
      Object.keys(variables).forEach(key => {
        console.log(
          `%c${key}: %c${variables[key]}`,
          'color: gray; font-weight: lighter',
          'color: black; font-weight: bold'
        );
      })
    }

    console.groupCollapsed('QUERY');
    console.log(query);
    console.groupEnd();
    console.groupEnd();
    return forward(operation);
  }
  return forward(operation).map(result => {
    const time = new Date() - operation.getContext().start;
    console.groupCollapsed(
      `%cgraphql %c${operationType} %c${schemaName}::%c${queryName} %c(in ${time} ms)`,
      'color: gray; font-weight: lighter',
      'color: black; font-weight: bold; color: darkblue',
      'color: gray; font-weight: lighter',
      'color: black; font-weight: bold',
      'color: gray; font-weight: lighter'
    );
    if (variables) {
      Object.keys(variables).forEach(key => {
        console.log(
          `%c${key}: %c${variables[key]}`,
          'color: gray; font-weight: lighter',
          'color: black; font-weight: bold'
        );
      })
    }
    console.groupCollapsed('QUERY');
    console.log(query);
    console.groupEnd();
    console.groupCollapsed('RESULTS');
    if (result.data) {
      Object.keys(result.data[queryName]).forEach(key => {
        console.log(
          `%c${key}: %c${result.data[queryName][key]}`,
          'color: gray; font-weight: lighter',
          'color: black; font-weight: bold'
        );
      });
    }
    if (result.errors) {
      result.errors.forEach(err => {
        console.log(
          `%c${err.message}: %c${err.path[0]}`,
          'color: gray; font-weight: lighter',
          'color: black; font-weight: bold'
        );
      });
    }
    console.groupEnd();
    console.groupEnd();
    return result;
  });
});

export default consoleLogger;
