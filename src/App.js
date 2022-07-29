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

  const getGoals = async () => {
    const data = await getDocs(goalsCollectionRef);
    setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    // const getGoals = async () => {
    //   const data = await getDocs(goalsCollectionRef);
    //   setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
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
      <GoalList goals={goals} deleteGoal={deleteGoal} />
    </div>
  );
}

export default App;
