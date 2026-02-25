import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container">
      <h1>SubTrack</h1>
      <p>Track and manage all your subscriptions in one place.</p>
      <Link to="/login">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default Landing;