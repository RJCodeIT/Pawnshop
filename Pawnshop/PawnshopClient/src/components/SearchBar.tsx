import { useState, useEffect } from "react";

interface SearchBarProps<T> {
  placeholder: string;
  data: T[];
  onSearch: (filteredData: T[]) => void;
  searchKeys: (keyof T)[];
}

export default function SearchBar<T>({
  placeholder,
  data,
  onSearch,
  searchKeys,
}: SearchBarProps<T>) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const filteredData = data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        if (typeof value === "string" || typeof value === "number") {
          return value.toString().toLowerCase().includes(query.toLowerCase());
        }
        return false;
      })
    );
    onSearch(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, data]);

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 
                 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                 text-gray-900 placeholder-gray-500
                 shadow-sm transition-colors duration-200"
      />
    </div>
  );
}
