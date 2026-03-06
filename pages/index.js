import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList.js";
import Head from "next/head.js";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Welcome and browse all the awesome meetsup!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://an010719_db_user:yGWQ81ilepkXKD9R@cluster0.g0mxfv0.mongodb.net/meetups?retryWrites=true&w=majority",
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  console.log(meetups);

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
