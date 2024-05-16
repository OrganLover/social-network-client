import type { ReactNode } from 'react';

export type PostProps = {
  id: number;
  features: {
    rating?: ReactNode;
    actions?: ReactNode;
  };
};
