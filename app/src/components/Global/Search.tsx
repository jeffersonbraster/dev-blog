import React from "react";

const Search = () => {
  const [search, setSearch] = React.useState("");
  return (
    <div className="search w-100 position-relative me-4">
      <input
        type="text"
        className="form-control mx-2 w-100 my-2 w-100"
        value={search}
        placeholder="Pesquise uma publicação"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
