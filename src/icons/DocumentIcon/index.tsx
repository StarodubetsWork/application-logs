import { type FC } from "react";
import { ICON_SIZE_CLASSES } from "../config";
import type { IBaseIconProps } from "@interfaces";

const DocumentIcon: FC<IBaseIconProps> = ({
  className = "",
  size = "md",
  "aria-hidden": ariaHidden = true,
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
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
};

export default DocumentIcon;
