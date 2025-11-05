// UsersTable.jsx
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserByIdThunk } from "@/features/users/usersThunks";
import { cn } from "@/utils/cn";

import LeftAngle from "@/assets/icons/left-angle.svg";

const UsersTable = ({ users, onBan }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);
  const navigate = useNavigate();

  return (
    <table className="table users-table">
      <thead className="table-header">
        <tr className="table-row">
          <th className="table-head">#</th>
          <th className="table-head">اسم المستخدم</th>
          <th className="table-head">رقم الهاتف</th>
          <th className="table-head">النشاط</th>
          <th className="table-head">تفاصيل</th>
        </tr>
      </thead>
      {loading ? (
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={`loading-${i}`} className="table-row animate-pulse">
              <td className="table-cell">
                <div className="h-4 bg-gray-300 rounded w-6 mx-auto"></div>
              </td>
              <td className="table-cell">
                <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
              </td>
              <td className="table-cell">
                <div className="h-4 bg-gray-300 rounded w-28 mx-auto"></div>
              </td>
              <td className="table-cell">
                <div className="h-6 bg-gray-300 rounded w-16 mx-auto"></div>
              </td>
              <td className="table-cell">
                <div className="h-6 bg-gray-300 rounded w-6 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody className="table-body">
          {users.map((e, i) => (
            <tr key={e.id} className="table-row">
              <td className="table-cell">{i + 1}</td>
              <td className="table-cell">{e.name}</td>
              <td className="table-cell">{e.phone}</td>
              <td className="table-cell">
                <button
                  type="button"
                  className={cn("ban-btn", e.suspend ? "un-ban" : "ban")}
                  onClick={() => onBan(e)}
                >
                  {e.suspend ? "تفعيل" : "حظر"}
                </button>
              </td>
              <td className="table-cell">
                {/* <button
                  type="button"
                  className="inline-block bg-[#5EB756] p-1 rounded-full"
                  onClick={() => {
                    dispatch(getUserByIdThunk(e.id))
                      .unwrap()
                      .then(() => navigate(`/users/${e.id}`));
                  }}
                >
                  <img src={LeftAngle} alt="left-angle" className="w-2 h-2" />
                </button> */}
                <Link to={`/users/${e.id}`} className="inline-block bg-[#5EB756] p-1 rounded-full">
                  <img src={LeftAngle} alt="left-angle" className="w-2 h-2" />
                </Link>
              </td>
            </tr>
          ))}
          {users.length < 10 &&
            [...Array(10 - users.length)].map((_, i) => (
              <tr key={`empty-${i}`} className="">
                <td colSpan={5}>&nbsp;</td>
              </tr>
            ))}
        </tbody>
      )}
    </table>
  );
};

export default UsersTable;
