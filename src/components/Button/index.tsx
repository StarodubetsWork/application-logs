import {
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { SpinnerIcon } from "@icons";
import { classNames } from "@utils";

const variantClasses = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300 disabled:cursor-not-allowed",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
  danger:
    "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300 disabled:cursor-not-allowed",
  ghost:
    "hover:bg-gray-100 text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed",
  icon: "hover:bg-gray-100 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed p-2",
  gradient:
    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:from-blue-300 disabled:to-purple-300 disabled:cursor-not-allowed",
  link: "text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline disabled:text-blue-300 disabled:cursor-not-allowed p-0",
};

const sizeClasses = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-2 text-xs sm:text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "icon"
  | "gradient"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled,
  className = "",
  children,
  ref,
  ...props
}: IButtonProps): ReactElement => {
  const isDisabled = disabled || loading;

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50";

  const variantClass = variantClasses[variant];
  const sizeClass =
    variant === "icon" || variant === "link" ? "" : sizeClasses[size];
  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = classNames(
    baseClasses,
    variantClass,
    sizeClass,
    widthClass,
    className
  );

  const renderIcon = () => {
    if (loading) {
      return (
        <div className="animate-spin h-4 w-4">
          <SpinnerIcon size="sm" aria-hidden />
        </div>
      );
    }
    if (icon) {
      return icon;
    }
    return null;
  };

  const iconElement = renderIcon();
  const hasIcon = !!iconElement;
  const hasChildren = !!children;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={buttonClasses}
      {...props}
    >
      {hasIcon && iconPosition === "left" && (
        <span className={hasChildren ? "mr-2" : ""}>{iconElement}</span>
      )}

      {loading && loadingText ? loadingText : children}

      {hasIcon && iconPosition === "right" && (
        <span className={hasChildren ? "ml-2" : ""}>{iconElement}</span>
      )}
    </button>
  );
};

export default Button;
