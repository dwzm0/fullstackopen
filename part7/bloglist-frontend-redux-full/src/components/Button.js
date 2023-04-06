const Button = ({ children, onClick }) => (
  <button
    className="rounded border border-zinc-600 px-5 py-2 text-base font-bold ring-sky-200 hover:ring-2"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
