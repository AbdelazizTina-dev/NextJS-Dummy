import MeetupDetail from "../components/meetups/MeetupDetail";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
const MeetupDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <MeetupDetail
        img={props.meetup.img}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://aziz:cempew07@cluster0.dru6p.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collection = db.collection("meetups");

  const meetups = await collection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://aziz:cempew07@cluster0.dru6p.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const collection = db.collection("meetups");

  const meetup = await collection.findOne({ _id: ObjectId(meetupId) });

  client.close;

  return {
    props: {
      meetup: {
        title: meetup.title,
        img: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      },
    },
  };
};

export default MeetupDetailPage;
