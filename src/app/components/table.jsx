import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ selectedSort, onSort, columns, data, children }) => {
  return (
    <>
      <table className="table">
        {children || (
          <>
            <TableHeader
              selectedSort={selectedSort}
              onSort={onSort}
              columns={columns}
            />
            <TableBody data={data} columns={columns} />
          </>
        )}
      </table>
    </>
  );
};

Table.propTypes = {
  selectedSort: PropTypes.object,
  onSort: PropTypes.func,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array
};
export default Table;
