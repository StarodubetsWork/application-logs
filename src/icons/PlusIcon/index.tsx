import { type FC } from 'react';
import { ICON_SIZE_CLASSES } from "../config";
import type { IBaseIconProps } from "@interfaces";

const PlusIcon: FC<IBaseIconProps> = ({ 
  className = '', 
  size = 'md',
  'aria-hidden': ariaHidden = true 
}) => {
  return (
    <svg
      className={`${ICON_SIZE_CLASSES[size]} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

export default PlusIcon;
