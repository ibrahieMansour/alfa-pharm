const ProductsPage = () => {
  return (
    <>
      <div className="flex w-full h-full flex-col gap-y-2 p-4">
        <div className="card">
          <div className="card-header">
            <p className="card-title">قائمة المنتجات</p>
            <button className="card-buuton">إضافة مستخدم +</button>
          </div>
          <div className="card-body">
            <table className=" table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">#</th>
                  <th className="table-head">Product</th>
                  <th className="table-head">Price</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Rating</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {[...Array(50)].map((_, i) => {
                  return (
                    <tr className="table-row" key={i}>
                      <td className="table-cell">1</td>
                      <td className="table-cell">2</td>
                      <td className="table-cell">3</td>
                      <td className="table-cell">4</td>
                      <td className="table-cell">5</td>
                      <td className="table-cell">6</td>
                    </tr>
                  );
                })}
                <tr className="table-row">
                  <td className="table-cell">last</td>
                  <td className="table-cell">last</td>
                  <td className="table-cell">last</td>
                  <td className="table-cell">last</td>
                  <td className="table-cell">last</td>
                  <td className="table-cell">last</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white h-[50px]"></div>
      </div>
    </>
  );
};

export default ProductsPage;
