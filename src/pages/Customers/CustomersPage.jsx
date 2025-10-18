import PlusIcon from "../../assets/icons/plus.svg";

const CustomersPage = () => {
  return (
    <>
      <div className="flex w-full h-full flex-col gap-y-2 p-4">
        <div className="card">
          <div className="card-header">
            <p className="card-title">قائمة المستخدمين</p>
            <button className="card-button bg-[#5EB756] flex justify-center items-center gap-x-1 rounded-lg p-2">
              <span className="text-white text-[10px]">إضافة مستخدم</span>
              <img src={PlusIcon} alt="plus-icon" className="w-3 h-3" />
            </button>
          </div>
          <div className="card-body">
            <table className=" table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">الترتيب</th>
                  <th className="table-head">اسم المستخدم</th>
                  <th className="table-head">رقم الهاتف</th>
                  <th className="table-head">النشاط</th>
                  <th className="table-head">تفاصيل</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {[...Array(50)].map((_, i) => {
                  return (
                    <tr key={i} className="table-row">
                      <td className="table-cell">{i + 1}</td>
                      <td className="table-cell">name-{i + 1}</td>
                      <td className="table-cell">01020515897</td>
                      <td className="table-cell">تفعيل</td>
                      {/* <td className="table-cell">حظر</td> */}
                      <td className="table-cell">d</td>
                    </tr>
                  );
                })}
                <tr className="table-row">
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

export default CustomersPage;
