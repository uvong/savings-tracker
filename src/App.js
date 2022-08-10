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
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import GoalList from "./GoalList";
import DepositList from "./DepositList";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack } from "react-bootstrap";
import GoalModal from "./GoalModal";

function App() {
  const goalsCollectionRef = collection(db, "goals");
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [currentGoal, setCurrentGoal] = useState([]);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const user = auth.currentUser;

  const getGoals = async () => {
    const q = query(goalsCollectionRef, where("owner", "==", user.uid));
    const data = await getDocs(q);
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
      <Container className="my-4">
        <header className="App-header">Savings Tracker</header>
        <div>Current user ID: {user?.uid}</div>
        <Stack direction="horizontal" gap="2" className="my-2">
          <h1 className="me-auto">Savings Goals</h1>
          <Button
            size="sm"
            variant="outline-dark"
            onClick={() => {
              setShowGoalModal(true);
            }}
          >
            Add Goal
          </Button>
          <Button size="sm" variant="secondary" onClick={logout}>
            Logout
          </Button>
        </Stack>
        <div className="App-wrapper">
          <div className="Main">
            <div className="Goal-list">
              <GoalList
                goals={goals}
                deleteGoal={deleteGoal}
                getDeposits={getDeposits}
                getDepositsRef={getDepositsRef}
                getCurrentGoal={getCurrentGoal}
                addDeposit={addDeposit}
                sumDepositAmount={sumDepositAmount}
                deposits={deposits}
              />
              <GoalModal
                show={showGoalModal}
                handleClose={() => setShowGoalModal(false)}
                addGoal={addGoal}
                goalsCollectionRef={goalsCollectionRef}
                getGoals={getGoals}
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
      </Container>
    </div>
  );
}

export default App;
