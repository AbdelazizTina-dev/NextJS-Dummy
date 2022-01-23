import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const Meetups = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://aziz:cempew07@cluster0.dru6p.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collection = db.collection("meetups");

  const meetups = await collection.find().toArray();

  const finalMeetups = meetups.map((meetup) => ({
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
    id: meetup._id.toString(),
  }))

  client.close();

  return {
    props: {
      meetups: finalMeetups,
    },
    revalidate: 10,
  };
};

export default Meetups;
