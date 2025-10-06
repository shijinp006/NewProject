// components/GlobalSpinner.tsx

import { useLoading } from "../loadingContext/loadingContext";

export const GlobalSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="h-40 sm:h-48 md:h-56 bg-gray-200 w-full shimmer"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
