import { useState } from "react";
import AppBar from "../components/AppBar";
import BoardsSection from "../components/BoardsSection";
import Card from "../components/Card";

const pendingTasks2 = [
  {
    id: 1,
    title: "Test NodeJS backend",
    description: "Test the whole backend that is developed in Nodejs ",
  },
];

const ongoingTask2 = [
  {
    id: 2,
    title: "Add database and user authentication",
    description: "Add database and user authentication to the backend",
  },
  {
    id: 3,
    title: "Deploy the backend",
    description: "Deploy the backend to the production",
  },
];

const doneTasks2 = [
  {
    id: 4,
    title: "Setup the frontend and backend",
    description: "Setup the frontend and backend",
  },
  {
    id: 5,
    title: "Deploy the frontend and backend",
    description: "Deploy the frontend and backend",
  },
];

const Board = () => {
  const [pendingTasks, setPendingTasks] = useState(pendingTasks2);
  const [ongoingTask, setOngoingTask] = useState(ongoingTask2);
  const [doneTasks, setDoneTasks] = useState(doneTasks2);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <AppBar />
      <div className="flex flex-1 gap-4 p-4">
        
        {/* Pending Tasks Board */}
        <div className="flex-1 flex flex-col">
          <BoardsSection
            title="To Do"
            variant="todo"
            count={pendingTasks.length}
            onDrop={(item) => {
              setPendingTasks((p) => p.filter((x) => x.id !== item.id));
              setOngoingTask((p) => p.filter((x) => x.id !== item.id));
              setDoneTasks((p) => p.filter((x) => x.id !== item.id));
              setPendingTasks((p) => [...p, item]);
            }}
          >
            {pendingTasks.map((task) => (
              <Card
                key={task.id}
                title={task.title}
                description={task.description}
                id={task.id}
              />
            ))}
          </BoardsSection>
        </div>

        {/* Ongoing Task Board */}
        <div className="flex-1 flex flex-col">
          <BoardsSection
            title="In Progress"
            variant="inProgress"
            count={ongoingTask.length}
            onDrop={(item) => {
              setPendingTasks((p) => p.filter((x) => x.id !== item.id));
              setOngoingTask((p) => p.filter((x) => x.id !== item.id));
              setDoneTasks((p) => p.filter((x) => x.id !== item.id));
              setOngoingTask((p) => [...p, item]);
            }}
          >
            {ongoingTask.map((task) => (
              <Card
                key={task.id}
                title={task.title}
                description={task.description}
                id={task.id}
              />
            ))}
          </BoardsSection>
        </div>

        {/* Done Task Board */}
        <div className="flex-1 flex flex-col">
          <BoardsSection
            title="Done"
            variant="done"
            count={doneTasks.length}
            onDrop={(item) => {
              setPendingTasks((p) => p.filter((x) => x.id !== item.id));
              setOngoingTask((p) => p.filter((x) => x.id !== item.id));
              setDoneTasks((p) => p.filter((x) => x.id !== item.id));
              setDoneTasks((p) => [...p, item]);
            }}
          >
            {doneTasks.map((task) => (
              <Card
                key={task.id}
                title={task.title}
                description={task.description}
                id={task.id}
              />
            ))}
          </BoardsSection>
        </div>
      </div>
    </div>
  );
};

export default Board;
