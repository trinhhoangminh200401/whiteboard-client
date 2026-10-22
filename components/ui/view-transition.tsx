'use client';

import React from 'react';

interface Props {
  name: string;
  children: React.ReactNode;
  className?: string;
}

export default function ViewTransition({ name, children, className }: Props) {
  return (
    <div style={{ viewTransitionName: name } as React.CSSProperties} className={className}>
      {children}
    </div>
  );
}
