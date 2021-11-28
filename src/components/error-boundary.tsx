import React, { ReactNode } from "react";

// 类型别名
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// 错误边界组件一定要用 class 组件
// 因为要使用生命周期函数 static getDerivedStateFromError 和 componentDidCatch
// export class ErrorBoundary extends React.Component<
//   {
//     children: ReactNode;
//     fallbackRender: FallbackRender;
//   },
//   { error: Error | null }
// > {}

// 使用 React.PropsWithChildren<P> 引入 children 属性
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    // 直接返回一个状态，而不是使用 this.setState()
    // 并且在 static 方法中 this 指向的不是实例，而是类本身
    return { error };
  }

  render() {
    const { children, fallbackRender } = this.props;
    const { error } = this.state;

    if (error) {
      // render props ??
      return fallbackRender({ error });
    }

    return children;
  }
}
