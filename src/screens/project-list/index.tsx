import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Typography } from "antd";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/projects";
import { usePersons } from "utils/persons";
import styled from "@emotion/styled";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  // 原始类型的数据可以放在依赖里，组件状态可以放进依赖里
  // 非组件状态的对象不能放进依赖里
  const [params, setParams] = useUrlQueryParam(["name", "personId"]);
  const debouncedParams = useDebounce(params, 500);
  const { isLoading, error, data: list } = useProjects(debouncedParams);
  const { data: persons } = usePersons();

  useDocumentTitle("项目列表", false);

  useEffect(() => {
    // setParams({ name1: "ace" });
    return () => {};
  }, []);

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
