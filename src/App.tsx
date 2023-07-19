import useQuerySearch from "./useQuerySearch";

export default function App() {
  const [searchParams, setSearchParams] = useQuerySearch();

  return (
    <input
      type="text"
      value={searchParams.filter || ""}
      onChange={(e) => setSearchParams({ filter: e.target.value })}
    />
  );
}
