import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  // param 发生变化就会重新发起请求
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
