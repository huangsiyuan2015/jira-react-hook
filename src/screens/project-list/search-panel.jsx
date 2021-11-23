import React from "react";

export const SearchPanel = ({ params, setParams, persons }) => {
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
