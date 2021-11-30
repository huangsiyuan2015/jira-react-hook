import React from "react";
import { Form, Input, Select } from "antd";

interface SearchPanelProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
  persons: Person[];
}

export interface Person {
  id: string;
  name: string;
}

export const SearchPanel = ({
  params,
  setParams,
  persons,
}: SearchPanelProps) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          value={params.name}
          onChange={(event) =>
            setParams({
              ...params,
              name: event.target.value,
            })
          }
          placeholder="项目名"
        />
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
    </Form>
  );
};
