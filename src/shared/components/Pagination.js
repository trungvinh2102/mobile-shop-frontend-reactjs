import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total, currentPage, hasNext, hasPrev, limit } = pages;
  const totalPages = Math.ceil(total / limit);
  const location = useLocation();
  const navigate = useNavigate();

  const formatUrl = (page) => {
    return `${location.pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
  };

  const goToPage = (page) => {
    setSearchParams({ ...searchParams, page: page });
    navigate(formatUrl(page));
  };

  const renderPagesHTML = (delta = 2) => {
    const pages = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <>
      {
        totalPages > 1 &&
        <ul className="pagination">
          {hasPrev && (
            <li className="page-item">
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                Trang trước
              </button>
            </li>
          )}
          {renderPagesHTML().map((page) => (
            <li className={`page-item ${currentPage === page && 'active'}`} key={page}>
              <button className="page-link" onClick={() => goToPage(page)}>
                {page}
              </button>
            </li>
          ))}
          {hasNext && (
            <li className="page-item">
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                Trang sau
              </button>
            </li>
          )}
        </ul>
      }
    </>

  );
};
export default Pagination;


