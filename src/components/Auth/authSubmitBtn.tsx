type AuthSubmitBtnProps = {
  btnText: string;
};

const AuthSubmitBtn = ({ btnText }: AuthSubmitBtnProps) => {
  return (
    <button type="submit" className="btn-input group">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-primary-700 group-hover:text-primary-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      {btnText ? btnText : 'OK'}
    </button>
  );
};

export default AuthSubmitBtn;
