import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@uidotdev/usehooks";

import {
  fetchOrders,
  searchOrdersThunk,
  updateOrderStatusThunk,
} from "@/features/orders/ordersThunks";

import OrdersTable from "./OrdersTable";
import EditOrderStatusModal from "./EditOrderStatusModal";
import OrdersSearch from "./OrdersSearch";

import CardHeader from "@/components/CardHeader";
import Pagination from "@/components/Pagination";
import { Offcanvas } from "@/components/Offcanvas";

import NotificationSound from "@/assets/sounds/notification.mp3";
import { useLocation } from "react-router-dom";

const OrdersPage = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 640px)");
  const dispatch = useDispatch();
  const { orders, meta } = useSelector((state) => state.orders);
  const location = useLocation();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("orders_page");
    return savedPage ? Number(savedPage) : 1;
  });

  const [filters, setFilters] = useState({
    status: "",
    orderNumber: "",
    userPhone: "",
    userName: "",
  });

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    localStorage.setItem("orders_page", page);
  }, [page]);

  const getSearchPayload = () => {
    const payload = {};
    ["status", "orderNumber", "userPhone", "userName"].forEach((key) => {
      if (filters[key]?.trim()) payload[key] = filters[key].trim();
    });
    return payload;
  };

  useEffect(() => {
    if (location.state) {
      const { userPhone, userName } = location.state;
      const prefilledFilters = {
        userPhone: userPhone || "",
        userName: userName || "",
      };

      setFilters((prev) => ({ ...prev, ...prefilledFilters }));
      setIsSearching(true);
      setPage(1);
      dispatch(searchOrdersThunk({ ...prefilledFilters, page: 1 }));

      // ✅ Clear navigation state so it doesn't trigger again
      window.history.replaceState({}, document.title);
    }
  }, [location.state, dispatch]);

  useEffect(() => {
    const payload = getSearchPayload();

    if (isSearching) {
      if (Object.keys(payload).length === 0) return;
      dispatch(searchOrdersThunk({ ...payload, page }));
    } else {
      // ✅ Fetch once when entering
      dispatch(fetchOrders({ page }));

      // ✅ Refresh every 10 seconds
      const interval = setInterval(() => {
        dispatch(fetchOrders({ page }));
      }, 10000);

      // ✅ Cleanup interval on unmount or change
      return () => clearInterval(interval);
    }
  }, [page, dispatch, isSearching]);


  const handleUpdateOrderStatus = (data) => {
    setLoading(true);
    dispatch(updateOrderStatusThunk({ id: selectedOrder.id, data }))
      .unwrap()
      .then(() => {
        setIsUpdateOpen(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    if (open) setOpen(false);

    const payload = getSearchPayload();
    if (Object.keys(payload).length === 0) {
      handleCancelSearch();
      return;
    }

    setIsSearching(true);
    setPage(1);
    dispatch(searchOrdersThunk({ ...payload, page: 1 }));
  };

  const handleCancelSearch = () => {
    setFilters({
      status: "",
      orderNumber: "",
      userPhone: "",
      userName: "",
    });

    if (open) setOpen(false);
    if (!isSearching) return;
    setIsSearching(false);
    setPage(1);
    dispatch(fetchOrders({ page: 1 }));
  };

  return (
    <div className="flex w-full h-full flex-col gap-y-2 p-4">
      {/* Search Section */}
      {isDesktopDevice ? (
        <OrdersSearch
          filters={filters}
          setFilters={setFilters}
          search={handleSearch}
          cancel={handleCancelSearch}
        />
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-[#5EB756] text-white text-sm px-3 py-2 rounded-md shadow-sm sm:hidden"
        >
          بحث الطلبات
        </button>
      )}

      <div className="card">
        <CardHeader title={"الطلبات"} button={false} />
        <div className="card-body">
          <OrdersTable
            orders={orders}
            onEdit={(order) => {
              if (!order) return;
              setSelectedOrder(order);
              setIsUpdateOpen(true);
            }}
          />
        </div>
      </div>

      {/* pagination */}
      <Pagination
        page={meta?.page}
        totalPages={meta?.totalPage}
        totalUsers={meta?.total}
        limit={meta?.limit}
        onPageChange={setPage}
      />

      {isUpdateOpen && (
        <EditOrderStatusModal
          order={selectedOrder}
          onConfirm={handleUpdateOrderStatus}
          onClose={() => {
            setSelectedOrder(null);
            setIsUpdateOpen(false);
          }}
          loading={loading}
        />
      )}

      {open && (
        <Offcanvas title="بيانات الطلبات" onClose={() => setOpen(false)}>
          <OrdersSearch
            filters={filters}
            setFilters={setFilters}
            cancel={handleCancelSearch}
            search={handleSearch}
          />
        </Offcanvas>
      )}
    </div>
  );
};

export default OrdersPage;
