import { type InputHTMLAttributes } from "react";

interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
  label,
  error,
  className = "",
  containerClassName = "",
  id,
  ref,
  ...props
}: IInputProps) => {
  const inputId = id || props.name;

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-300" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
