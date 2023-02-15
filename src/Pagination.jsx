import React from 'react'

function Pagination({ handleChangePage, page }) {
  return [...Array(3)].map((_, index) => (
    <li
      className={index === page ? 'active' : ''}
      onClick={() => handleChangePage(index)}
    >
      {index + 1}
    </li>
  ))
}

export default Pagination
