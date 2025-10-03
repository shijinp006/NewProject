// components/GlobalSpinner.tsx

import { useLoading } from "../loadingContext/loadingContext";

export const GlobalSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
      <div className="w-12 h-12 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};
