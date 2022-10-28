type Props = {
  title: string;
};

export function JustTextHeader({ title }: Props) {
  return <div className="text-center truncate">{title}</div>;
}
