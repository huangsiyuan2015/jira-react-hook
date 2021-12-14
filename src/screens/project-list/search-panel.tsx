import { Form, Input } from "antd";
import { UserSelect } from "components/user-select";
import { Person } from "types/person";
import { Project } from "types/project";

interface SearchPanelProps {
  persons: Person[];
  params: Partial<Pick<Project, "name" | "personId">>;
  setParams: (params: SearchPanelProps["params"]) => void;
}

export const SearchPanel = ({
  params,
  setParams,
  persons,
}: SearchPanelProps) => {
  return (
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          type="text"
          value={params.name}
          onChange={(event) =>
            setParams({
              ...params,
              name: event.target.value,
            })
          }
          placeholder="项目名"
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={params.personId}
          onChange={(value) =>
            setParams({
              ...params,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
