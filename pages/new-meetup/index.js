import { useRouter } from "next/router.js";
import NewMeetupForm from "../../components/meetups/NewMeetupForm.js";

export default function NewMeetup() {
  const router = useRouter();
  async function handleAddMeeupHandler(data) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);

    router.push("/");
  }

  return <NewMeetupForm onAddMeetup={handleAddMeeupHandler} />;
}
