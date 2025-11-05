import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdThunk } from "@/features/users/usersThunks";

import UserInfo from "./UserInfo";
import UserOrdersInfo from "./UserOrdersInfo";
import UserHeader from "./UserHeader";

const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 🧩 Fetch data on mount (and re-fetch on refresh)
  useEffect(() => {
    if (id) {
      dispatch(getUserByIdThunk(id));
    }
  }, [id, dispatch]);

  return (
    <div className="flex w-full h-full flex-col gap-y-2 py-4 px-4 lg:px-12">
      <UserHeader />
      <UserInfo />
      <UserOrdersInfo />
    </div>
  );
};

export default UserDetailsPage;
