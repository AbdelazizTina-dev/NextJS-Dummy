import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const data = JSON.parse(req.body);

  if (req.method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://aziz:cempew07@cluster0.dru6p.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup inserted" });
  }
};

export default handler;
