// Skeleton UI
export const SkeletonCard = () => (
  <div className="animate-pulse shadow-lg rounded-2xl overflow-hidden">
    <div className="bg-gray-300 aspect-square w-full rounded-2xl"></div>

    <div className="p-4 space-y-3">
      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);
