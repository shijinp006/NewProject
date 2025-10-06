// components/GlobalSpinner.tsx

import { useLoading } from "../loadingContext/loadingContext";

export const GlobalSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-100 rounded-3xl shadow-lg overflow-hidden"
          >
            {/* Image placeholder */}
            <div className="h-48 sm:h-56 md:h-64 bg-gray-200 w-full shimmer"></div>

            {/* Text placeholders */}
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
