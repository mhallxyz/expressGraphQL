var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');



let testNumber = Math.random();

const TestObject = {
  hello: () =>  'Hello world!',
  test: () =>  'This is a test',
  egg: () => testNumber,
}



var root = {
  hello: () => 'Hello world!',
  test: () => 'This is a test',
  egg: () => testNumber,
  testArray: () => [TestObject]
};

var schema = buildSchema(`
  type Query {
    hello: String,
    test: String,
    egg: Float,
    testArray: [TestObject]
  },
  type TestObject {
    hello: String,
    test: String,
    egg: Float
  }
`);

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
