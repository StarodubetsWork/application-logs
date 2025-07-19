import { type FC } from 'react';
import { ICON_SIZE_CLASSES } from "../config";
import type { IBaseIconProps } from "@interfaces";

const XMarkIcon: FC<IBaseIconProps> = ({ 
  className = '', 
  size = 'md',
  'aria-hidden': ariaHidden = true 
}) => {
  return (
    <svg 
      className={`${ICON_SIZE_CLASSES[size]} ${className}`}
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      aria-hidden={ariaHidden}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M6 18L18 6M6 6l12 12" 
      />
    </svg>
  );
};

export default XMarkIcon;
