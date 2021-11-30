import React from "react";
import { usePersons } from "utils/persons";
import { IdSelect } from "./id-select";

// React.ComponentProps<typeof IdSelect> 获取 IdSelect 中所有 props 的属性
export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = usePersons();
  return <IdSelect options={users || []} {...props} />;
};
