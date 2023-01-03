type AuthErrorProps = {
  errorMsg: string;
};

const AuthError = ({ errorMsg }: AuthErrorProps) => {
  type ErrorCardProps = {
    text: string;
  };
  const ErrorCard = ({ text }: ErrorCardProps) => (
    <div className="border-red-500 border-2 text-red-500 flex justify-center items-center p-4">
      <p>{text}</p>
    </div>
  );

  switch (errorMsg) {
    case 'WRONG_CREDENTIALS':
      return (
        <ErrorCard text="El nombre de usuario o la contraseña son incorrectos." />
      );
    case 'USERNAME_ALREADY_EXISTS':
      return <ErrorCard text="El usuario ya existe." />;
    default:
      return <ErrorCard text="Ocurrio un error durante el LogIn." />;
  }
};

export default AuthError;
