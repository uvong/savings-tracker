import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";

function App() {
  const goalsCollectionRef = collection(db, "goals");

  return (
    <div className="App">
      <GoalForm goalsCollectionRef={goalsCollectionRef} />
      <GoalList goalsCollectionRef={goalsCollectionRef} />
    </div>
  );
}

export default App;
