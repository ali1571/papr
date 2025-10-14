import React, { useEffect, useState } from "react";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

/**
 * PdfViewer - Optimized
 * - Fast PDF loading with proper loading states
 * - Error handling for failed loads
 */
export default function PdfViewer({ fileUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!fileUrl) return null;

  const zoomPluginInstance = zoomPlugin();

  const defaultLayout = defaultLayoutPlugin({
    renderToolbar: (Toolbar) => (
      <Toolbar>
        {(slots) => {
          const { renderDefaultToolbar } = defaultLayout.toolbarPluginInstance;
          const transform = (slot) => ({
            ...slot,
            Open: () => <></>,
            OpenMenuItem: () => <></>,
          });
          return renderDefaultToolbar(transform)(slots);
        }}
      </Toolbar>
    ),
    sidebarTabs: (defaultTabs) => [defaultTabs[0]],
  });

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [fileUrl]);

  const handleDocumentLoad = () => {
    setIsLoading(false);
    // Auto-fit to page width for better UX
    setTimeout(() => {
      zoomPluginInstance.zoomTo(SpecialZoomLevel.PageWidth);
    }, 100);
  };

  const handleDocumentLoadError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-theme font-body">Loading PDF...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <p className="text-red-500 font-body mb-2">Failed to load PDF</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-theme text-theme rounded-lg hover:bg-theme/10 transition"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <Viewer
        fileUrl={fileUrl}
        plugins={[defaultLayout, zoomPluginInstance]}
        onDocumentLoad={handleDocumentLoad}
        onLoadError={handleDocumentLoadError}
      />
    </div>
  );
}
