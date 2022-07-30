import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";
import DepositList from "./DepositList";

function App() {
  const goalsCollectionRef = collection(db, "goals");

  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);

  const getGoals = async () => {
    const data = await getDocs(goalsCollectionRef);
    setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getDeposits = async (goalID) => {
    const depositsRef = collection(db, "goals", goalID, "deposits");
    // db path: goals/<goalID>/deposits
    const data = await getDocs(depositsRef);
    setDeposits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getDepositsRef = (goalID) => {
    console.log("hello");
    const depositsRef = collection(db, "goals", goalID, "deposits");
    return depositsRef;
  };

  useEffect(() => {
    getGoals();
  }, []);

  const deleteGoal = async (id) => {
    const goalDoc = doc(db, "goals", id);
    await deleteDoc(goalDoc);
    getGoals();
  };

  return (
    <div className="App">
      <GoalForm goalsCollectionRef={goalsCollectionRef} getGoals={getGoals} />
      <GoalList
        goals={goals}
        deleteGoal={deleteGoal}
        getDeposits={getDeposits}
        getDepositsRef={getDepositsRef}
      />
      <DepositList deposits={deposits} />
    </div>
  );
}

export default App;
