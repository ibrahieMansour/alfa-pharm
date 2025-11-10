import React from "react";

const FillTableRow = ({ RowCount, colSpan = 5 }) => {
  return (
    <>
      {RowCount < 10 &&
        [...Array(10 - RowCount)].map((_, i) => (
          <tr key={`empty-${i}`} className="">
            <td colSpan={colSpan}>&nbsp;</td>
          </tr>
        ))}
    </>
  );
};

export default FillTableRow;
