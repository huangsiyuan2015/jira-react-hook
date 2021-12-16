import { Button, List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { usePersons } from "utils/persons";

export const UserPopover = () => {
  const { data: persons, refetch } = usePersons();

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {persons?.map((person) => (
          <List.Item>
            <List.Item.Meta title={person.name} />
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 10rem;
`;
