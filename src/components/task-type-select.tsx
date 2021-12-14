import React from "react";
import { usePersons } from "utils/persons";
import { useTaskTypes } from "utils/task-type";
import { IdSelect } from "./id-select";

// React.ComponentProps<typeof IdSelect> 获取 IdSelect 中所有 props 的属性
export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
