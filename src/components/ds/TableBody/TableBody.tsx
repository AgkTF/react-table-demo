import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function TableBody({ children }: Props) {
  return <tbody>{children}</tbody>;
}
