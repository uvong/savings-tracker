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
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack } from "react-bootstrap";
import GoalModal from "./GoalModal";

function App() {
  const goalsCollectionRef = collection(db, "goals");
  const depositsCollectionRef = collection(db, "deposits");
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [currentDeposits, setCurrentDeposits] = useState([]);
  // const [currentGoal, setCurrentGoal] = useState([]);
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

  // const getCurrentGoal = (goalID) => {
  //   const currentGoalRef = doc(db, "goals", goalID);

  //   getDoc(currentGoalRef).then((doc) => {
  //     const currentGoal = { ...doc.data(), id: doc.id };
  //     currentGoal.dateCreated = currentGoal.dateCreated.toDate().toDateString();
  //     setCurrentGoal(currentGoal);
  //     console.log(currentGoal.dateCreated);
  //   });
  // };

  const deleteDeposit = (depositID) => {
    const depositDoc = doc(db, "deposits", depositID);
    deleteDoc(depositDoc);
    // getAllDeposits(currentGoal.id);
  };

  const addDeposit = (depositInfo) => {
    addDoc(depositsCollectionRef, depositInfo);
  };

  const sumDepositAmount = (deposits) => {
    //console.log("in sum deposit amout function")
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
          // getCurrentGoal={getCurrentGoal}
          addDeposit={addDeposit}
          sumDepositAmount={sumDepositAmount}
          deposits={deposits}
          getCurrentGoalDeposits={getCurrentGoalDeposits}
          setCurrentDeposits={updateCurrentDeposits}
          currentDeposits = {currentDeposits}
          deleteDeposit = {deleteDeposit}
        />
        <GoalModal
          show={showGoalModal}
          handleClose={() => setShowGoalModal(false)}
          addGoal={addGoal}
          goalsCollectionRef={goalsCollectionRef}
          getGoals={getGoals}
        />

        {/* <div>
          <h1>{currentGoal.name}</h1>
          <h2>Goal Amount: ${currentGoal.totalAmount}</h2>
          <div>Created on: {currentGoal.dateCreated}</div>
        </div> */}
{/* 
        <DepositList
          deposits={currentDeposits}
          deleteDeposit={deleteDeposit}
          sumDepositAmount={sumDepositAmount}
        /> */}
      </Container>
    </div>
  );
}

export default App;
