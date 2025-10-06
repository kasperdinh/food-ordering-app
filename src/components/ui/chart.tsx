"use client";

import * as React from "react";

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

// Simplified chart components - light theme only
export const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const ChartTooltip = ({ children }: { children?: React.ReactNode }) => (
  <div>{children}</div>
);
export const ChartTooltipContent = ({
  children,
}: {
  children?: React.ReactNode;
}) => <div>{children}</div>;
export const ChartLegend = ({ children }: { children?: React.ReactNode }) => (
  <div>{children}</div>
);
export const ChartLegendContent = ({
  children,
}: {
  children?: React.ReactNode;
}) => <div>{children}</div>;

export const useChart = () => ({ config: {} });
