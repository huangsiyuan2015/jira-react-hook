import { useHttp } from "utils/http";
import { Person } from "types/person";
import { useQuery } from "react-query";
import { User } from "auth-provider";

export const usePersons = (param?: Partial<Person>) => {
  const client = useHttp();

  // param 发生变化就会重新发起请求
  return useQuery<User[]>(["persons", param], () =>
    client("persons", { data: param })
  );
};
