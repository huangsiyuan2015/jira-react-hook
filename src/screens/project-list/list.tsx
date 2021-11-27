import React from "react";
import { Table } from "antd";
import { Person } from "screens/project-list/search-panel";
import dayjs from "dayjs";

interface ListProps {
  list: Project[];
  persons: Person[];
}

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
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
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render: (value, project) => (
            <span>
              {project.created
                ? dayjs(project.created).format("YYYY-MM-DD")
                : "无"}
            </span>
          ),
        },
      ]}
      dataSource={list}
    />
  );
};
