import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function TableHead({ children }: Props) {
  return <thead>{children}</thead>;
}
