import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Button } from "antd";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/projects";
import { usePersons } from "utils/persons";
import styled from "@emotion/styled";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ErrorBox, Row } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  // 原始类型的数据可以放在依赖里，组件状态可以放进依赖里
  // 非组件状态的对象不能放进依赖里
  const [params, setParams] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(params, 200));
  const { data: persons } = usePersons();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button type="link" onClick={open}>
          创建项目
        </Button>
      </Row>
      <SearchPanel
        params={params}
        setParams={setParams}
        persons={persons || []}
      />
      <ErrorBox error={error} />
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
