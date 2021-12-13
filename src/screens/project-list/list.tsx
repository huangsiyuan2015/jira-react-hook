import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Table, TableProps, Modal } from "antd";
import { Person } from "screens/project-list/search-panel";
import dayjs from "dayjs";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/projects";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { useDeleteConfig } from "utils/use-optimistic-options";

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
  const { mutate } = useEditProject(useProjectsQueryKey());

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

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
          render: (value, project) => <More project={project} />,
        },
      ]}
      {...props}
    />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk: () => {
        deleteProject({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit" onClick={editProject(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item
            key="delete"
            onClick={() => confirmDeleteProject(project.id)}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link">...</Button>
    </Dropdown>
  );
};
