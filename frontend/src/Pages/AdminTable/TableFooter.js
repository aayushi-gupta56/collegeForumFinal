import React, { useEffect } from "react";
import "./TableFooter.css";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="adminTableFooter">
      {range.map((el, index) => (
        <button
          key={index}
          className={`adminFooterButton ${
            page === el ? "adminFooterActiveButton" : "adminFooterInactiveButton"
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;