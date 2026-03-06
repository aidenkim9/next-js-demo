import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://an010719_db_user:yGWQ81ilepkXKD9R@cluster0.g0mxfv0.mongodb.net/meetups?retryWrites=true&w=majority",
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Success to create new meetup" });
  }
}
