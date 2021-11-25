import React from "react";
import { Person } from "screens/project-list/search-panel";

interface ListProps {
  list: Project[];
  persons: Person[];
}

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
}

export const List = ({ list, persons }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>项目</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {persons.find((person) => person.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
