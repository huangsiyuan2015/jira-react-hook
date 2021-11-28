import React, { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Typography } from "antd";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/projects";
import { usePersons } from "utils/persons";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: 0,
  });
  const debouncedParams = useDebounce(params, 500);
  const { isLoading, error, data: list } = useProjects(debouncedParams);
  const { data: persons } = usePersons();

  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        params={params}
        setParams={setParams}
        persons={persons || []}
      />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        persons={persons || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
