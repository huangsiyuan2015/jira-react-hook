import React from "react";
import { Input, Select } from "antd";

interface SearchPanelProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
  persons: Person[];
}

export interface Person {
  id: number;
  name: string;
}

export const SearchPanel = ({
  params,
  setParams,
  persons,
}: SearchPanelProps) => {
  return (
    <form action="">
      <div style={{ display: "flex" }}>
        <Input
          type="text"
          value={params.name}
          onChange={(event) =>
            setParams({
              ...params,
              name: event.target.value,
            })
          }
        />
        <Select
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {persons.map((person) => (
            <Select.Option value={person.id} key={person.id}>
              {person.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
