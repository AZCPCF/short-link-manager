import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="truncate text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
      </div>
      {actions}
    </div>
  );
}
