import axios from "axios";
import { useEffect, useState } from "react";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPageUrl, setCurrPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  useEffect(() => {
    let cancel;
    setLoading(true);
    axios
      .get(currPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setPokemon(response.data.results.map((p) => p.name));
        setLoading(false);
        setNextPage(response.data.next);
        setPrevPage(response.data.previous);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    return () => {
      cancel();
    };
  }, [currPageUrl]);

  if (loading) return "Loading ...";

  function goToNextPage() {
    setCurrPageUrl(nextPage);
  }

  function goToPrevPage() {
    setCurrPageUrl(prevPage);
  }

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        goToNextPage={nextPage ? goToNextPage : null}
        goToPrevPage={prevPage ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
