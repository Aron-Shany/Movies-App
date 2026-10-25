import './index.css'

const Pagination = props => {
  const {currentPage, totalPages, onChangePage} = props

  if (totalPages <= 1) {
    return null
  }

  const onClickPrev = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1)
    }
  }

  const onClickNext = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1)
    }
  }

  return (
    <div className="pagination">
      <button
        type="button"
        className="page-btn"
        onClick={onClickPrev}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <p className="page-text">{`${currentPage} of ${totalPages}`}</p>
      <button
        type="button"
        className="page-btn"
        onClick={onClickNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination
