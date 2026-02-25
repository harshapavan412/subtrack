import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { isPro } = useContext(AuthContext);

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem("subscriptions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
  }, [subscriptions]);

  const addSubscription = (sub) => {
    if (!isPro && subscriptions.length >= 3) {
      alert("Free plan allows only 3 subscriptions. Upgrade to Pro!");
      return;
    }
    setSubscriptions([...subscriptions, sub]);
  };

  const deleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  // Convert yearly price to monthly equivalent
  const totalMonthly = subscriptions.reduce((acc, curr) => {
    if (curr.billingCycle === "yearly") {
      return acc + Number(curr.price) / 12;
    }
    return acc + Number(curr.price);
  }, 0);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        deleteSubscription,
        totalMonthly,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};