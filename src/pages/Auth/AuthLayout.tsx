type Props = {
  children?: JSX.Element | JSX.Element[] | undefined;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className="light-theme generic-page ">
      <div className="w-full max-w-md space-y-8">{children}</div>
    </div>
  );
};
