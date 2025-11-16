import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getOrderByIdThunk,
  addItemToOrderThunk,
  updateOrderItemThunk,
  deleteOrderItemThunk,
  deleteOrderThunk,
} from "@/features/orders/ordersThunks";

import OrderHeader from "./OrderHeader";
import OrderDetails from "./OrderDetails";
import OrderItems from "./OrderItems";

import UpdateItemsModal from "./UpdateItemsModal";
import DeleteItemsModal from "./DeleteItemsModal";
import DeleteOrderModal from "./DeleteOrderModal";

import AddItemModal from "./AddItemModal";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { currentOrder ,loading} = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getOrderByIdThunk(id))
        .unwrap()
        .then(() => setError(false))
        .catch(() => setError(true));
    }
  }, [id, dispatch]);

  const [showDetails, setShowDetails] = useState(false); // false = items, true = order info

  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isUpdateItemOpen, setIsUpdateItemOpen] = useState(false);
  const [isDeleteItemOpen, setIsDeleteitemOpen] = useState(false);
  const [isDeleteOrderOpen, setIsDeleteOrderOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [loadingModal, setLoadingModal] = useState(false);

  const closeModal = () => {
    setSelectedItem(null);
    setIsAddItemOpen(false);
    setIsUpdateItemOpen(false);
    setIsDeleteitemOpen(false);
    setIsDeleteOrderOpen(false);
  };

  const handleAddItem = (data) => {
    setLoadingModal(true);
    dispatch(addItemToOrderThunk({ orderId: currentOrder.id, data }))
      .unwrap()
      .then(() => {
        dispatch(getOrderByIdThunk(id))
        setIsAddItemOpen(false);
      })
      .finally(() => setLoadingModal(false));
  };

  const handleUpdateItem = (data) => {
    setLoadingModal(true);
    dispatch(updateOrderItemThunk({ itemId: selectedItem.id, data }))
      .unwrap()
      .then(() => {
        setIsUpdateItemOpen(false);
      })
      .finally(() => {
        setLoadingModal(false);
      });
  };

  const handleDeleteItem = () => {
    setLoadingModal(true);
    dispatch(deleteOrderItemThunk(selectedItem.id))
      .unwrap()
      .then(() => {
        setIsDeleteitemOpen(false);
      })
      .finally(() => {
        setLoadingModal(false);
      });
  };

  const handleDeleteOrder = () => {
    setLoadingModal(true);
    dispatch(deleteOrderThunk(currentOrder.id))
      .unwrap()
      .then(() => {
        setIsDeleteOrderOpen(false);
        navigate("/orders", { replace: true });
      })
      .finally(() => setLoadingModal(false));
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-lg text-red-500 font-medium">
          حدث خطأ أثناء تحميل بيانات الطلب أو الطلب غير موجود
        </p>
        <button
          onClick={() => navigate("/orders", { replace: true })}
          className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
        >
          العودة للخلف
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full flex-col gap-y-2 py-4 px-4 lg:px-12">
      <OrderHeader
        order={currentOrder}
        setDelete={setIsDeleteOrderOpen}
        setAdd={setIsAddItemOpen}
      />
      <div className="flex-1 flex justify-between items-center gap-x-4 lg:gap-x-12">
        <OrderDetails
          order={currentOrder}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
        <div className="w-[1px] h-3/4 max-sm:hidden bg-[repeating-linear-gradient(to_bottom,_#E97E39_0,_#E97E39_5px,_#dde2dc_5px,_#dde2dc_10px)]"></div>
        <OrderItems
          items={currentOrder.items}
          loading={loading}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          onUpdate={(item) => {
            if (!item) return;
            setSelectedItem(item);
            setIsUpdateItemOpen(true);
          }}
          onDelete={(item) => {
            if (!item) return;
            setSelectedItem(item);
            setIsDeleteitemOpen(true);
          }}
        />
      </div>

      {isAddItemOpen && (
        <AddItemModal onConfirm={handleAddItem} onClose={closeModal} loading={loadingModal} />
      )}
      {isUpdateItemOpen && (
        <UpdateItemsModal
          item={selectedItem}
          onConfirm={handleUpdateItem}
          onClose={closeModal}
          loading={loadingModal}
        />
      )}
      {isDeleteItemOpen && (
        <DeleteItemsModal
          item={selectedItem}
          onConfirm={handleDeleteItem}
          onClose={closeModal}
          loading={loadingModal}
        />
      )}
      {isDeleteOrderOpen && (
        <DeleteOrderModal
          order={currentOrder}
          onConfirm={handleDeleteOrder}
          onClose={closeModal}
          loading={loadingModal}
        />
      )}
    </div>
  );
};

export default OrderDetailsPage;
