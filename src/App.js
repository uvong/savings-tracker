import { useState, useEffect } from "react";
import "./App.css";
import { db, auth } from "./firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import GoalList from "./GoalList";
import GoalForm from "./GoalForm";
import DepositList from "./DepositList";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

function App() {
  const goalsCollectionRef = collection(db, "goals");
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [currentGoal, setCurrentGoal] = useState([]);
  const user = auth.currentUser;

  const getGoals = async () => {
    const data = await getDocs(goalsCollectionRef);
    setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (!user) {
      navigate("login");
    }
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
      currentGoal.dateCreated = currentGoal.dateCreated.toDate().toDateString();
      setCurrentGoal(currentGoal);
      console.log(currentGoal.dateCreated);
    });
  };

  const deleteDeposit = (depositID) => {
    const depositDoc = doc(db, "goals", currentGoal.id, "deposits", depositID);
    deleteDoc(depositDoc);
    getDeposits(currentGoal.id);
  };

  const addDeposit = (depositInfo) => {
    const depositDocRef = collection(db, "goals", currentGoal.id, "deposits");
    addDoc(depositDocRef, depositInfo);
    getDeposits(currentGoal.id);
  };

  const sumDepositAmount = (deposits) => {
    let sumTotal = 0;
    for (const deposit of deposits) {
      sumTotal += deposit.amount;
    }
    return sumTotal;
  };

  const logout = async () => {
    await signOut(auth);
    navigate("login");
  };

  return (
    <div className="App">
      <div className="App-wrapper">
        <header className="App-header">Savings Tracker</header>
        <nav>
          <button onClick={logout}>Logout</button>
          <div>Current user ID: {user?.uid}</div>
        </nav>
        <div className="Main">
          <div className="Goal-list">
            <GoalList
              goals={goals}
              deleteGoal={deleteGoal}
              getDeposits={getDeposits}
              getDepositsRef={getDepositsRef}
              getCurrentGoal={getCurrentGoal}
              addDeposit={addDeposit}
              //totalAmount = {currentGoal.totalAmount}
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
              <ProgressBar
                value={sumDepositAmount(deposits)}
                max={currentGoal.totalAmount}
              />
              <h2>Goal Amount: ${currentGoal.totalAmount}</h2>
              <div>Created on: {currentGoal.dateCreated}</div>
            </div>

            <div>
              <DepositList
                deposits={deposits}
                deleteDeposit={deleteDeposit}
                sumDepositAmount={sumDepositAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
