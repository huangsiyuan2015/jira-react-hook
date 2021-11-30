import React from "react";
import { Link } from "react-router-dom";
import { Table, TableProps } from "antd";
import { Person } from "screens/project-list/search-panel";
import dayjs from "dayjs";

interface ListProps extends TableProps<Project> {
  persons: Person[];
}

export interface Project {
  id: number;
  name: string;
  personId: string;
  organization: string;
  created: number;
}

export const List = ({ persons, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (value, project) => (
            <Link to={`${project.id}`}>{project.name}</Link>
          ),
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
      {...props}
    />
  );
};
