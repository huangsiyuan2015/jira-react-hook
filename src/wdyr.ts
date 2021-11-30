/// <reference types="@welldone-software/why-did-you-render" />

import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    // 配置项
    // trackAllPureComponents: true, // 是否跟踪所有的组件
    trackAllPureComponents: false,
  });
}
