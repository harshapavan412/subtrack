import { useContext, useState } from "react";
import { SubscriptionContext } from "../context/SubscriptionContext";
import { AuthContext } from "../context/AuthContext";
import SubscriptionCard from "../components/SubscriptionCard";

const Dashboard = () => {
  const { subscriptions, addSubscription, totalMonthly } =
    useContext(SubscriptionContext);

  const { isPro, upgradeToPro, logout, user } =
    useContext(AuthContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) return;

    addSubscription({
      id: Date.now(),
      name,
      price,
      billingCycle,
    });

    setName("");
    setPrice("");
    setBillingCycle("monthly");
  };

  return (
    <div className="container">
      <div className="top-bar">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <p className="user-info">
        Logged in as: {user?.email}
      </p>

      {/* Analytics Section */}
      <div className="analytics">
        <div className="analytics-card">
          <h4>Total Subscriptions</h4>
          <p>{subscriptions.length}</p>
        </div>

        <div className="analytics-card">
          <h4>Monthly Recurring Revenue</h4>
          <p>${totalMonthly.toFixed(2)}</p>
        </div>

        <div className="analytics-card">
          <h4>Plan</h4>
          <p>{isPro ? "Pro" : "Free"}</p>
        </div>
      </div>

      {!isPro && (
        <button className="upgrade-btn" onClick={upgradeToPro}>
          Upgrade to Pro
        </button>
      )}

      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Subscription Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <select
          value={billingCycle}
          onChange={(e) => setBillingCycle(e.target.value)}
        >
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <button type="submit">Add</button>
      </form>

      {subscriptions.length === 0 && (
        <p className="empty-state">
          No subscriptions yet. Add your first one.
        </p>
      )}

      <div className="grid">
        {subscriptions.map((sub) => (
          <SubscriptionCard key={sub.id} sub={sub} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;