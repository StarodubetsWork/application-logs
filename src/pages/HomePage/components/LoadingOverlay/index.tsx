import { type FC } from "react";
import { LoadingSpinner } from "@components";
import { texts } from "@config";

const LoadingOverlay: FC = () => {
  return (
    <div
      className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10"
      role="status"
      aria-label={texts.homePage.a11y.addButtonLoading}
    >
      <LoadingSpinner size="md" text={texts.loading.updating} />
    </div>
  );
};

export default LoadingOverlay;
