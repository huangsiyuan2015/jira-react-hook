import { useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // param 发生变化就会重新发起请求
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
