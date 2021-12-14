import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";
import { Project } from "types/project";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // param 发生变化就会重新发起请求
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useEditConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();

  // 依赖查询，依赖变量 id，如果 id 不存在就不会发起请求
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  );
};
