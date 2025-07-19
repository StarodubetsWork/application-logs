import { type FC } from "react";
import { LoadingSpinner } from "@components";
import { texts } from "@config";

const LoadingState: FC = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-96">
      <LoadingSpinner size="lg" text={texts.loading.logs} />
    </div>
  );
};

export default LoadingState;
