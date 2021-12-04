import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import { Person } from "screens/project-list/search-panel";
import dayjs from "dayjs";
import { Pin } from "components/pin";
import { useEditProject } from "utils/projects";
import { useProjectModal } from "./util";

interface ListProps extends TableProps<Project> {
  persons: Person[];
  refresh?: () => void;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}

export const List = ({ persons, refresh, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(refresh);
  const { open } = useProjectModal();

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render: (value, project) => (
            <Pin
              checked={project.pin}
              onCheckedChange={pinProject(project.id)}
            />
          ),
        },
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
        {
          render: (value, project) => (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="edit">
                    <Button type="link" onClick={open}>
                      创建项目
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button type="link">...</Button>
            </Dropdown>
          ),
        },
      ]}
      {...props}
    />
  );
};
