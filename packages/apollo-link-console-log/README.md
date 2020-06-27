# apollo-link-console-log

> A logger for Apollo Link with expandable output

## Installing / Getting Started

```shell
yarn add apollo-link-console-log
```

### Prerequisites

* apollo-Link
* graphql-tag

### Usage
Compose as you would any other link. Remember to place the logger before your terminating link.
```javascript
import consoleLogger from 'apollo-link-console-log';

// ...
ApolloLink.from([
  consoleLogger,
  // ...
]);
```

## Screenshots

### Console log (expanded with other similar loggers):

![Query Expanded](https://github.com/castigere/apollo-link-console-log/blob/master/docs/example-output.png)

