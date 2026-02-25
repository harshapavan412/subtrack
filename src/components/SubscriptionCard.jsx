import { useContext } from "react";
import { SubscriptionContext } from "../context/SubscriptionContext";

const SubscriptionCard = ({ sub }) => {
  const { deleteSubscription } = useContext(SubscriptionContext);

  const monthlyEquivalent =
    sub.billingCycle === "yearly"
      ? (sub.price / 12).toFixed(2)
      : sub.price;

  return (
    <div className="card">
      <h4>{sub.name}</h4>
      <p>
        ${sub.price} / {sub.billingCycle}
      </p>

      {sub.billingCycle === "yearly" && (
        <small>≈ ${monthlyEquivalent} per month</small>
      )}

      <button onClick={() => deleteSubscription(sub.id)}>
        Delete
      </button>
    </div>
  );
};

export default SubscriptionCard;