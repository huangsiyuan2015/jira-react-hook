import { useEffect } from "react";
import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";
import { cleanObject } from "utils";
import { Person } from "types/person";

export const usePersons = (params?: Partial<Person>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Person[]>();

  useEffect(() => {
    run(client("persons", { data: cleanObject(params || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return result;
};
