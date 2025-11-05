import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, createUserThunk, updateUserThunk } from "@/features/users/usersThunks";

import UsersTable from "./UsersTable";
import AddUserModal from "./AddUserModal";
import BlockUserModal from "./BlockUserModal";

import CardHeader from "../../components/CardHeader";
import Pagination from "../../components/Pagination";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, meta } = useSelector((state) => state.users);

  const [isBanOpen, setIsBanOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers({ page }));
  }, [page, dispatch]);

  const handleAddUser = (data) => {
    setLoading(true);
    dispatch(createUserThunk(data))
      .unwrap()
      .then(() => {
        setIsAddOpen(false);
      })
      .finally(() => {
        setLoading(false); // stop loading always
      });
  };

  const handleBlockUser = (data) => {
    setLoading(true);
    dispatch(updateUserThunk({ id: selectedUser.id, data: { suspend: !selectedUser.suspend } }))
      .unwrap()
      .then(() => {
        setIsBanOpen(false);
      })
      .finally(() => {
        setLoading(false); // stop loading always
      });
  };

  return (
    <div className="flex w-full h-full flex-col gap-y-2 p-4">
      <div className="card">
        <CardHeader
          title={"المستخدمين"}
          buttonTitle={"مستخدم"}
          handleClick={() => setIsAddOpen(true)}
        />
        <div className="card-body">
          <UsersTable
            users={users}
            onBan={(user) => {
              setSelectedUser(user);
              setIsBanOpen(true);
            }}
          />
        </div>
      </div>

      {/* pagination */}
      <Pagination
        page={meta.page}
        totalPages={meta.totalPage}
        totalUsers={meta.total}
        limit={meta.limit}
        onPageChange={setPage}
      />

      {isBanOpen && (
        <BlockUserModal
          user={selectedUser}
          onConfirm={handleBlockUser}
          onClose={() => setIsBanOpen(false)}
          loading={loading}
        />
      )}

      {isAddOpen && (
        <AddUserModal
          onConfirm={handleAddUser}
          onClose={() => setIsAddOpen(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default UsersPage;
