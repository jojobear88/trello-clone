import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

(() => {
  const columns = [
    { id: "column-1", title: "Todo", taskIds: ["task-1"] },
    { id: "column-2", title: "In progress", taskIds: [] },
    { id: "column-3", title: "Review", taskIds: [] },
    { id: "column-4", title: "Completed", taskIds: [] },
  ];

  const columnOrder = ["column-1", "column-2", "column-3", "column-4"];

  // Add columns data to the database
  columns.forEach(function (obj) {
    const columnRef = doc(db, "columns", obj.id);
    setDoc(columnRef, {
      id: obj.id,
      title: obj.title,
      taskIds: obj.taskIds,
    });
  });

  // Add column order to the database
  const columnOrderRef = doc(db, "columnOrder", "col-order");
  setDoc(columnOrderRef, {
    columnOrder: columnOrder,
  });

  // Add a task to the database
  const tasksRef = doc(db, "tasks", "task-1");
  setDoc(tasksRef, {
    id: "task-1",
    taskTitle: "Demo Task",
    taskDescription: "To be added...",
  }).then(e => {
    console.log(e);
  })
})();
