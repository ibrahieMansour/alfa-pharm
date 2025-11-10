import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserByIdThunk } from "@/features/users/usersThunks";

import UserInfo from "./UserInfo";
import UserOrdersInfo from "./UserOrdersInfo";
import UserHeader from "./UserHeader";

const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getUserByIdThunk(id))
        .unwrap()
        .then(() => setError(false))
        .catch(() => setError(true));
    }
  }, [id, dispatch]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-lg text-red-500 font-medium">
          حدث خطأ أثناء تحميل بيانات المستخدم أو المستخدم غير موجود
        </p>
        <button
          onClick={() => navigate("/users",{replace:true})}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          العودة للخلف
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full flex-col gap-y-2 py-4 px-4 lg:px-12">
      <UserHeader />
      <UserInfo />
      <UserOrdersInfo />
    </div>
  );
};

export default UserDetailsPage;
