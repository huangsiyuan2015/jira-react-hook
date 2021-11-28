import React, { useEffect } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { KanbanScreen } from "./kanban";
import { EpicScreen } from "./epic";

export const ProjectScreen = () => {
  useEffect(() => {
    console.log(window.location);
  }, []);

  return (
    <div>
      <span>ProjectScreen</span>
      <br />
      <Link to="kanban">看板</Link>
      <br />
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="kanban" element={<KanbanScreen />} />
        <Route path="epic" element={<EpicScreen />} />
        {/* 重定向，子路由下 / 路径重定向到 /kanban */}
        <Route
          path="/"
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
      </Routes>
    </div>
  );
};
