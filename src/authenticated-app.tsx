import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styled from "@emotion/styled";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { ProjectScreen } from "screens/project";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  return (
    <BrowserRouter>
      <Container>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            {/* 重定向，根路径 / 重定向到 /projects */}
            <Route path="/" element={<Navigate to="/projects" />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Container>
    </BrowserRouter>
  );
};

const PageHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button
          style={{ padding: 0 }}
          type="link"
          onClick={() => navigate("/")}
        >
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
        </Button>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(event) => event.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
  /* height: clac(100vh - 6rem); */
`;
