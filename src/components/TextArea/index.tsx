import { type TextareaHTMLAttributes } from "react";

interface ITextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  error?: string;
  className?: string;
  containerClassName?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

const TextArea = ({
  label,
  error,
  className = "",
  containerClassName = "",
  id,
  ref,
  ...props
}: ITextAreaProps) => {
  const textareaId = id || props.name;

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-300" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextArea;
