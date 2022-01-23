import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

const NewMeetup = () => {
  const router = useRouter();

  const submitHandler = async (formData) => {
    console.log(formData);

    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(formData),
      header: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data);

    router.replace("/");
  };

  return <NewMeetupForm onAddMeetup={submitHandler} />;
};

export default NewMeetup;
