import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";
import DepositList from "./DepositList";

function App() {
  const goalsCollectionRef = collection(db, "goals");

  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [currentGoal, setCurrentGoal] = useState([]);

  const getGoals = async () => {
    const data = await getDocs(goalsCollectionRef);
    setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getGoals();
  }, []);

  const addGoal = async (goalInfo) => {
    await addDoc(goalsCollectionRef, goalInfo);
    getGoals();
  };

  const deleteGoal = async (id) => {
    const goalDoc = doc(db, "goals", id);
    await deleteDoc(goalDoc);
    getGoals();
  };

  const getDeposits = async (goalID) => {
    const depositsRef = collection(db, "goals", goalID, "deposits");
    // db path: goals/<goalID>/deposits
    const data = await getDocs(depositsRef);
    setDeposits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getDepositsRef = (goalID) => {
    const depositsRef = collection(db, "goals", goalID, "deposits");
    return depositsRef;
  };

  const getCurrentGoal = (goalID) => {
    const currentGoalRef = doc(db, "goals", goalID);
    // db path goals/<goalID>
    getDoc(currentGoalRef).then((doc) => {
      const currentGoal = { ...doc.data(), id: doc.id };
      setCurrentGoal(currentGoal);
    });
  };

  const deleteDeposit = (depositID) => {
    const depositDoc = doc(db, "goals", currentGoal.id, "deposits", depositID);
    deleteDoc(depositDoc);
    getDeposits(currentGoal.id);
  };

  return (
    <div className="App">
      <div className="App-wrapper">
        <header className="App-header">Savings Tracker</header>
        <div className="Main">
          <div className="Goal-list">
            <GoalList
              goals={goals}
              deleteGoal={deleteGoal}
              getDeposits={getDeposits}
              getDepositsRef={getDepositsRef}
              getCurrentGoal={getCurrentGoal}
            />
            <GoalForm
              goalsCollectionRef={goalsCollectionRef}
              getGoals={getGoals}
              addGoal={addGoal}
            />
          </div>
          <div className="Current-goal">
            <div>
              <h1>{currentGoal.name}</h1>
              <h2>Goal Amount: ${currentGoal.totalAmount}</h2>
            </div>
            <div className="Deposits">
              <DepositList deposits={deposits} deleteDeposit={deleteDeposit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
