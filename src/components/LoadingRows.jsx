const LoadingRows = ({ cols = 5 }) => {
  return (
    <tbody>
      {[...Array(10)].map((_, i) => (
        <tr key={`loading-${i}`} className="table-row animate-pulse">
          {[...Array(cols)].map((__, j) => (
            <td key={j} className="table-cell">
              <div className="h-4 bg-gray-300 rounded mx-auto w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default LoadingRows;
