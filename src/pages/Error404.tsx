import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div>
      No encontramos lo que buscas.
      <Link to="/">Sacame de aqui!</Link>
    </div>
  );
};

export default Error404;
