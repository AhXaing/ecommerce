import { Card } from "react-bootstrap";
import imgSrc from "../../assets/images/singha.png";
const Home = () => {
  return (
    <Card
      style={{
        width: "13rem",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "5px 5px",
      }}
    >
      <Card.Img
        variant="top"
        src={imgSrc}
        style={{ width: 200, height: 180 }}
      />
      <Card.Body style={{ padding: 3 }}>
        <Card.Title>Product Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          content.
        </Card.Text>
      </Card.Body>

      <Card.Body style={{ padding: 5 }}>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Home;
