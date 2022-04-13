const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      console.log("Connection error!!");
      return;
    }

    const db = client.db(databaseName);
    db.collection("tasks").insertMany(
      [
        {
          description: "Learn Nodejs",
          completed: false,
        },
        {
          description: "Design download agent",
          completed: false,
        },
        {
          description: "Work on upload agent",
          completed: true,
        },
      ],
      (error, result) => {
        if (error) {
          return console.log("Error while inserting document");
        }

        console.log(result.insertedIds);
      }
    );
  }
);
