import { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { Project } from "screens/project-list/list";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = () =>
    client("projects", { data: cleanObject(params || {}) });

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...result,
  };
};

export const useAddProject = () => {
  const client = useHttp();
  const { run, ...result } = useAsync();

  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...result,
  };
};
