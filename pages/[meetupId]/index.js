import { MongoClient, ObjectId } from "mongodb";

import { useRouter } from "next/router";
import MeetupDetails from "../../components/meetups/MeetupDetails";
import Head from "next/head";

export default function MeetupDetail(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <MeetupDetails image={props.image} title={props.title} address={props.address} description={props.description} />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://an010719_db_user:yGWQ81ilepkXKD9R@cluster0.g0mxfv0.mongodb.net/meetups?retryWrites=true&w=majority",
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetsup = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetsup.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://an010719_db_user:yGWQ81ilepkXKD9R@cluster0.g0mxfv0.mongodb.net/meetups?retryWrites=true&w=majority",
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  return {
    props: {
      id: meetup._id.toString(),
      image: meetup.image,
      title: meetup.title,
      address: meetup.address,
      description: meetup.description,
    },
  };
}
