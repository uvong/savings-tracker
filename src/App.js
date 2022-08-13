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
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack } from "react-bootstrap";
import GoalModal from "./GoalModal";
import DepositListModal from "./DepositListModal";

function App() {
  const goalsCollectionRef = collection(db, "goals");
  const depositsCollectionRef = collection(db, "deposits");
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [currentDeposits, setCurrentDeposits] = useState([]);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showDepositListModal, setShowDepositListModal] = useState(false);
  const user = auth.currentUser;

  const getGoals = async () => {
    const q = query(goalsCollectionRef, where("owner", "==", user.uid));
    const data = await getDocs(q);
    setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // const getDeposit = async (goalId) => {
  //   const q = query(depositsCollectionRef, where("goal", "==", goalId));
  //   const data = await getDocs(q);
  //   setCurrentDeposits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };

  useEffect(() => {
    if (!user) {
      navigate("login");
    }
    getGoals();
    getAllDeposits();
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

  const getAllDeposits = async () => {
    const depositsRef = collection(db, "deposits");
    const data = await getDocs(depositsRef);
    setDeposits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getCurrentGoalDeposits = (goalId) => {
    const updatedDeposits = [];
    for (const deposit of deposits) {
      if (deposit.goalId === goalId) {
        updatedDeposits.push({ ...deposit });
      }
    }
    return updatedDeposits;
  };

  const deleteDeposit = async (depositID) => {
    const depositDoc = doc(db, "deposits", depositID);
    await deleteDoc(depositDoc);
    // getCurrentGoalDeposits(goalId);
    // getDeposit(goalId);
    //updateCurrentDeposits(getCurrentGoalDeposits(goalId));
  };

  const addDeposit = (depositInfo) => {
    addDoc(depositsCollectionRef, depositInfo);
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

  const updateCurrentDeposits = (updatedDeposits) => {
    setCurrentDeposits(updatedDeposits);
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

        <GoalList
          goals={goals}
          deleteGoal={deleteGoal}
          getAllDeposits={getAllDeposits}
          addDeposit={addDeposit}
          sumDepositAmount={sumDepositAmount}
          deposits={deposits}
          getCurrentGoalDeposits={getCurrentGoalDeposits}
          setCurrentDeposits={updateCurrentDeposits}
          currentDeposits={currentDeposits}
          deleteDeposit={deleteDeposit}
          showDepositListModal={() => {
            setShowDepositListModal(true);
          }}
        />
        <GoalModal
          show={showGoalModal}
          handleClose={() => setShowGoalModal(false)}
          addGoal={addGoal}
          goalsCollectionRef={goalsCollectionRef}
          getGoals={getGoals}
        />
        <DepositListModal
          show={showDepositListModal}
          handleClose={() => setShowDepositListModal(false)}
          currentDeposits={currentDeposits}
          deleteDeposit={deleteDeposit}
          setCurrentDeposits={setCurrentDeposits}
        />
      </Container>
    </div>
  );
}

export default App;
