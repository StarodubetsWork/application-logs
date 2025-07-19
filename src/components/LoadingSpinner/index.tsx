import { type FC } from "react";
import { SpinnerIcon } from "@icons";
import { texts } from "@config/texts";

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

interface ILoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

const LoadingSpinner: FC<ILoadingSpinnerProps> = ({
  size = "md",
  className = "",
  text = texts.loading.logs,
}) => (
  <div
    className={`flex flex-col items-center justify-center space-y-2 ${className}`}
    role="status"
    aria-live="polite"
    aria-label={text || texts.loading.logs}
  >
    <div className="animate-spin">
      <SpinnerIcon className="text-blue-600" size={size} aria-hidden />
    </div>
    {text && (
      <span
        className={`text-gray-600 ${textSizeClasses[size]} animate-pulse`}
        aria-hidden="true"
      >
        {text}
      </span>
    )}
    <span className="sr-only">{text || texts.loading.generic}</span>
  </div>
);

export default LoadingSpinner;
