import React from "react";
import { Drawer, Button } from "antd";

interface ProjectModalProps {
  projectModalOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({
  projectModalOpen,
  onClose,
}: ProjectModalProps) => {
  return (
    <Drawer width="100%" visible={projectModalOpen} onClose={onClose}>
      <h1>Project Modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
