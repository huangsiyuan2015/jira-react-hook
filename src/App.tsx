import React from "react";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {/* FullPageErrorFallback 是一个函数组件，却以 prop 的形式传递 */}
      {/* fallbackRender 可能是 render props ？？ */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
