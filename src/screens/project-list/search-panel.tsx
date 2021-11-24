import React from "react";

interface SearchPanelProps {
  params: {
    projectName: string;
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
      <div>
        <input
          type="text"
          value={params.projectName}
          onChange={(event) =>
            setParams({
              ...params,
              projectName: event.target.value,
            })
          }
        />
        <select
          value={params.personId}
          onChange={(event) =>
            setParams({
              ...params,
              personId: event.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {persons.map((person) => (
            <option value={person.id} key={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
