"use client";

import { useGetTasks } from "@/gen/hooks/tasks/use-get-tasks";
import { GetTasksQueryParamsDoneEnum } from "@/gen/types/tasks/get-tasks-type";
import { keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

export function TaskList() {
  const [done, setDone] = useState<string | undefined>(undefined);
  const { data: tasks, isLoading } = useGetTasks(
    {
      done: done as GetTasksQueryParamsDoneEnum,
    },
    { query: { placeholderData: keepPreviousData } }
  );

  return (
    <section>
      <select
        value={done}
        onChange={(e) => {
          if (e.target.value === "undefined") {
            setDone(undefined);
            return;
          }

          setDone(e.target.value);
        }}
        className="border mb-10"
      >
        <option value="undefined">All</option>
        <option value="true">Complete</option>
        <option value="false">Pending</option>
      </select>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}
