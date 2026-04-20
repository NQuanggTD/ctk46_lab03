export default function BlogLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </main>
  );
}
