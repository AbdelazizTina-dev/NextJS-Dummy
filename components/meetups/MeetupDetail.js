import styles from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <main className={styles.detail}>
      <img src={props.img} alt={props.title} />
      <h2>{props.title}</h2>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </main>
  );
};

export default MeetupDetail;
