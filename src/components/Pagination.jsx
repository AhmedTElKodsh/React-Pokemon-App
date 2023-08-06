function Pagination({ goToNextPage, goToPrevPage }) {
  return (
    <div>
      {goToNextPage && <button onClick={goToNextPage}>Next Page</button>}
      {goToPrevPage && <button onClick={goToPrevPage}>Previous Page</button>}
    </div>
  );
}

export default Pagination;
