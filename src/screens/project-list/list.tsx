import React from "react";
import { Table } from "antd";
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
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render: (value, project) => (
            <span>
              {persons.find((person) => person.id === project.personId)?.name ||
                "未知"}
            </span>
          ),
        },
      ]}
      dataSource={list}
    />
  );
};
