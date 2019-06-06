var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

let testNumber = Math.random();

const TestObject = {
  id: 1,
  hello: "Hello world!",
  test: "This is a test",
  egg: testNumber
};
const TestObject1 = {
  id: 2,
  hello: "Hello world!dfsgdsfg",
  test: "This is a test",
  egg: testNumber
};
const TestObject2 = {
  id: 3,
  hello: "Hello world!aaaaaaaaaaaaa",
  test: "test",
  egg: testNumber
};
const TestObject3 = {
  id: 4,
  hello: "Hello world!bbbbbbbbb",
  test: "test4",
  egg: testNumber
};

var root = {
  hello: () => "Hello world!",
  test: () => "This is a test",
  egg: () => testNumber,
  testArray: args => {
    if (args.test) {
      return [TestObject, TestObject1, TestObject2, TestObject3].filter(
        item => args.test === item.test
      );
    }
    return [TestObject, TestObject1, TestObject2, TestObject3];
  }
};

var schema = buildSchema(`
  type Query {
    hello: String,
    test: String,
    egg: Float,
    testArray(test: String): [TestObject]
  },
  type TestObject {
    id: Int,
    hello: String,
    test: String,
    egg: Float
  }
`);

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
