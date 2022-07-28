import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";

function App() {
  const goalsCollectionRef = collection(db, "goals");

  const [goals, setGoals] = useState([]);

  const getGoals = () => {
    const data = getDocs(goalsCollectionRef);
    setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(getGoals, []);

  const createGoal = async (goalInfo) => {
    await addDoc(goalsCollectionRef, {
      name: goalInfo.name,
      totalAmount: Number(goalInfo.totalAmount),
      dateCreated: new Date(),
      isReached: false,
    });
    getGoals();
  };

  const deleteGoal = async (id) => {
    const goalDoc = doc(db, "goals", id);
    await deleteDoc(goalDoc);
    getGoals();
  };
  return (
    <div className="App">
      <GoalForm
        goalsCollectionRef={goalsCollectionRef}
        createGoal={createGoal}
      />
      <GoalList deleteGoal={deleteGoal} getGoals={getGoals} goals={goals} />
    </div>
  );
}

export default App;
