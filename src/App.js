import { useState, useEffect } from "react";
import { db, auth } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import GoalList from "./GoalList";
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack, Card } from "react-bootstrap";
import GoalModal from "./GoalModal";
import DepositListModal from "./DepositListModal";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const goalsCollectionRef = collection(db, "goals");
  const depositsCollectionRef = collection(db, "deposits");
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [currentDeposits, setCurrentDeposits] = useState([]);
  const [currentGoal, setCurrentGoal] = useState("");
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showDepositListModal, setShowDepositListModal] = useState(false);
  const [user, loading] = useAuthState(auth);

  const getGoals = async () => {
    const q = query(goalsCollectionRef, where("owner", "==", user.uid));
    const data = await getDocs(q);
    setGoals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("login");
    }
    getGoals();
    getAllDeposits();
  }, [user, loading]);

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

  const getCurrentGoalDeposits = async (goalId) => {
    const q = query(depositsCollectionRef, where("goalId", "==", goalId));
    const data = await getDocs(q);
    setCurrentDeposits(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteDeposit = async (depositID) => {
    const depositDoc = doc(db, "deposits", depositID);
    await deleteDoc(depositDoc);
    getCurrentGoalDeposits(currentGoal);
    getAllDeposits();
  };

  const addDeposit = async (depositInfo) => {
    await addDoc(depositsCollectionRef, depositInfo);
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
    <>
      <style type="text/css">
        {`
          .custom-card {
          background-color: #6610f2;
          color: white;
          font-size: large;
        }
    `}
      </style>
      <Container className="my-4" style={{ maxWidth: "500px" }}>
        <Card
          className="d-flex w-100 text-center justify-content-center fs-1 custom-card"
          style={{ minHeight: "150px", maxWidth: "500px" }}
        >
          Indigo
        </Card>
        <Stack direction="horizontal" gap="2" className="my-2">
          <h1 className="me-auto">Savings Goals</h1>
          <Button
            size="sm"
            variant="outline-success"
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
          currentDeposits={currentDeposits}
          deleteDeposit={deleteDeposit}
          showDepositListModal={() => {
            setShowDepositListModal(true);
          }}
          setCurrentGoal={(goalId) => {
            setCurrentGoal(goalId);
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
    </>
  );
}

export default App;
