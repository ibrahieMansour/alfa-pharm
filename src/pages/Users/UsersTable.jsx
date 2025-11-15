import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingRows from "@/components/LoadingRows";
import FillTableRow from "@/components/FillTableRow";

import LeftAngle from "@/assets/icons/left-angle.svg";
import EditIcon from "@/assets/icons/edit.svg";
import DeleteIcon from "@/assets/icons/delete.svg";

const UsersTable = ({ users, onBan, onEdit, onDelete }) => {
  const { loading } = useSelector((state) => state.users);

  return (
    <table className="table users-table">
      <thead className="table-header">
        <tr className="table-row">
          <th className="table-head">#</th>
          <th className="table-head">اسم المستخدم</th>
          <th className="table-head">رقم الهاتف</th>
          <th className="table-head">التحكم</th>
          <th className="table-head">تفاصيل</th>
        </tr>
      </thead>
      {loading ? (
        <LoadingRows />
      ) : (
        <tbody className="table-body">
          {users.map((e, i) => (
            <tr key={e.id} className={`table-row ${e.suspend ? "baned" : ""}`}>
              <td className="table-cell">{i + 1}</td>
              <td className="table-cell">{e.name}</td>
              <td className="table-cell">{e.phone}</td>
              <td className="table-cell">
                <div className="flex items-center justify-center gap-3">
                  {/* <button className="opacity-50 hover:opacity-100" onClick={() => onBan(e)}>
                    <img src={e.suspend ? LockIcon : UnLockIcon} alt="Edit" className="w-5 h-5" />
                  </button> */}
                  <button className="opacity-50 hover:opacity-100" onClick={() => onEdit(e)}>
                    <img src={EditIcon} alt="Edit" className="w-5 h-5" />
                  </button>
                  <button className="opacity-50 hover:opacity-100" onClick={() => onDelete(e)}>
                    <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td className="table-cell">
                <Link to={`/users/${e.id}`} className="inline-block bg-[#5EB756] p-1 rounded-full">
                  <img src={LeftAngle} alt="left-angle" className="w-2 h-2" />
                </Link>
              </td>
            </tr>
          ))}
          <FillTableRow RowCount={users?.length} />
        </tbody>
      )}
    </table>
  );
};

export default UsersTable;
