export default function Pagination({ pagination, onPageClick }) {

  const pages = [];
  for (let pageNum = pagination.startPage; pageNum <= pagination.endPage; pageNum++) {
    pages.push(
      <li key={pageNum} className="page-item">
        <button
          className="btn text-secondary"
          onClick={() => onPageClick(pageNum)}
        >
          {pageNum}
        </button>
      </li>
    );
  }

  return (
    <div>
      <ul className="pagination justify-content-center">
        {pagination.existPrevPage && (
          <li className="page-item">
            <button
              className="btn text-secondary"
              onClick={() => onPageClick(pagination.startPage - 1)}
            >
              &laquo;
            </button>
          </li>
        )}

        {pages}

        {pagination.existNextPage && (
          <li className="page-item">
            <button
              className="btn text-secondary"
              onClick={() => onPageClick(pagination.endPage + 1)}
            >
              &raquo;
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}