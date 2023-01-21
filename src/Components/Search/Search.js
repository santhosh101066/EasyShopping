import React, { useCallback, useState } from "react";
import "../../CSS/Search.css";
import AxiosApi from "../../Api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search(props) {
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [dropdown,Setdropdown]=useState(false)
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setNotFound(false);
    if (e.target.value.length > 0) {
      AxiosApi.get("search/" + e.target.value).then((res) => {
        setData(res.data);
        Setdropdown(true)
        res.data.length === 0 && setNotFound(true);
      });
    } else {
      setData([]);
    }
  }, []);

  const handleClick = useCallback(
    (id) => {
      navigate("view/" + id);
      setData([]);
      Setdropdown(false)
    },
    [navigate]
  );

  return (
    <div className="search">
      <div className="search-control">
        <input
          type={"search"}
          placeholder="Search Product..."
          onChange={handleSearch}
          value={search}
        />
        <button
          onClick={() => {
            navigate("search?q=" + search);
            Setdropdown(false)
            setNotFound(false);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {dropdown && (
        <div className="search-dropdown">
          <ul>
            {data.slice(0,10).map((val) => (
              <li key={val.id} onClick={() => handleClick(val.id)}>
                {val.short_title}
              </li>
            ))}
            {notFound && <li>Product Not Found</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
