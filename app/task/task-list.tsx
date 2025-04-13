"use client";

import { useGetTasks } from "@/gen/hooks/tasks/use-get-tasks";
import { GetTasksQueryParamsDoneEnum } from "@/gen/types/tasks/get-tasks-type";
import { useState } from "react";

export function TaskList() {
  const [done, setDone] = useState("true");
  const { data: tasks } = useGetTasks({ done: done as GetTasksQueryParamsDoneEnum });

  return (
    <section>
      <select
        value={done}
        onChange={(e) => {
          setDone(e.target.value);
        }}
        className="border mb-10"
      >
        <option value="true">Complete</option>
        <option value="false">Pending</option>
      </select>

      <ul className="list-disc ">
        {!tasks?.data.length ? (
          <p>no tasks</p>
        ) : (
          <>
            {tasks?.data.map((task) => (
              <li key={task.id}>
                <span>
                  {task.name} <span className="ml-2">{task.done ? "✔️" : "❌"}</span>
                </span>
              </li>
            ))}
          </>
        )}
      </ul>
    </section>
  );
}
