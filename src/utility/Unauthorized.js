import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>You Do Not Have Permission to View This Page</h1>
      <Link to={"/"}>Reurn to Home Page</Link>
    </div>
  );
};

export default Unauthorized;
