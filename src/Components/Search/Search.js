import React, { useCallback, useState } from "react";
import "../../CSS/Search.css";
import AxiosApi from "../../Api/AxiosApi";
import { useNavigate } from "react-router-dom";

function Search(props) {
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [search,setSearch]=useState('')
  const navigate = useNavigate();
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value)
    setNotFound(false)
    if (e.target.value.length > 0) {
      AxiosApi.get("search/" + e.target.value).then((res) => {
        setData(res.data);
        res.data.length===0&&setNotFound(true)
      });
    } else {
      setData([]);
    }
  }, []);

  const handleClick = useCallback(
    (id) => {
      navigate("view/" + id);
      setData([]);
      setSearch('')
    },
    [navigate]
  );

  return (
    <div className="search">
      <input
        type={"search"}
        placeholder="Search Product..."
        onChange={handleSearch}
        value={search}
      />
      <div className="search-dropdown">
        <ul>
          {data.map((val) => (
            <li key={val.id} onClick={() => handleClick(val.id)}>
              {val.short_title}
            </li>
          ))}
          {notFound && <li>Product Not Found</li>}
        </ul>
      </div>
    </div>
  );
}

export default Search;
