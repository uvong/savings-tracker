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

  const deleteGoal = async (id) => {
    const goalDoc = doc(db, "goals", id);
    await deleteDoc(goalDoc);
  };
  return (
    <div className="App">
      <GoalForm goalsCollectionRef={goalsCollectionRef} />
      <GoalList
        goalsCollectionRef={goalsCollectionRef}
        deleteGoal={deleteGoal}
      />
    </div>
  );
}

export default App;
