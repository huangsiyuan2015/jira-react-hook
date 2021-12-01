import { useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Typography } from "antd";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/projects";
import { usePersons } from "utils/persons";
import styled from "@emotion/styled";
import { useProjectSearchParams } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  // 原始类型的数据可以放在依赖里，组件状态可以放进依赖里
  // 非组件状态的对象不能放进依赖里
  const [params, setParams] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(params, 200));
  const { data: persons } = usePersons();

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
        refresh={retry}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
