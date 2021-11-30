import React from "react";
import { Raw } from "types";
import { Select } from "antd";

// 把 Select 组件上所有 props 的类型复制过来
type SelectProps = React.ComponentProps<typeof Select>;

// 继承 Select 组件上所有的 props
// Select 组件和 IdSelect 组件都有 options 属性，共有属性的类型产生冲突，使用 Omit 剔除同名的属性
interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

export const IdSelect = ({
  value,
  onChange,
  defaultOptionName,
  options,
  ...restProps
}: IdSelectProps) => {
  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || 0)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
