import React from "react";

const TaskList = ({ todo, onMoveToDone }) => {
  return (
    <div>
      <h2 className="container">TODO</h2>
      <ul>
        {todo.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => onMoveToDone(t)}>
              Verschieben nach DONE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
