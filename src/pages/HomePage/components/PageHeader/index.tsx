import { type FC } from "react";
import { DocumentIcon, PlusIcon } from "@icons";
import { texts } from "@config";
import { Button } from "@components";

interface IPageHeaderProps {
  loading: boolean;
  onAddLogClick: () => void;
}

const PageHeader: FC<IPageHeaderProps> = ({ loading, onAddLogClick }) => {
  return (
    <header className="mb-8 sm:mb-10" role="banner">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <div
              className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              role="img"
              aria-label={texts.homePage.a11y.mainIcon}
            >
              <DocumentIcon className="text-white" size="xl" aria-hidden />
            </div>
            <div className="min-w-0">
              <h1
                className="text-left text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 leading-tight"
                id="page-title"
              >
                {texts.homePage.title}
              </h1>
              <div
                className="w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 rounded-full mt-2 shadow-sm"
                aria-hidden="true"
              ></div>
              <p
                className="text-left text-slate-600 text-sm sm:text-base font-medium mt-1 leading-relaxed"
                role="doc-subtitle"
                aria-describedby="page-title"
              >
                {texts.homePage.subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Button
            variant="gradient"
            onClick={onAddLogClick}
            disabled={loading}
            loading={loading}
            loadingText={texts.common.loading}
            icon={<PlusIcon size="sm" aria-hidden />}
            className="group w-full sm:w-auto transform sm:hover:scale-105 shadow-md hover:shadow-lg"
            aria-label={
              loading
                ? texts.homePage.a11y.addButtonLoading
                : texts.homePage.a11y.addButton
            }
            aria-describedby={loading ? "loading-status" : undefined}
          >
            {texts.homePage.newLogButton}
          </Button>
          {loading && (
            <span id="loading-status" className="sr-only">
              {texts.loading.logDataMessage}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
