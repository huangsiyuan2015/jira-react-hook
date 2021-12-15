import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "types/project";
import { Task } from "types/task";
import { useHttp } from "./http";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // param 发生变化就会重新发起请求
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();

  // 依赖查询，依赖变量 id，如果 id 不存在就不会发起请求
  return useQuery<Project>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};
