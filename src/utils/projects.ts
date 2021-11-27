import { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { Project } from "screens/project-list/list";

export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
