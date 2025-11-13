import { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateNotificationStatus,
  updateAllNotificationsStatus,
  deleteNotification,
  deleteAllNotifications,
} from "@/features/notifications/notificationsThunks";

import { formatDate } from "@/utils/formatDate";

import NotificationReadIcon from "../assets/icons/notification-read.svg"
import NotificationDeleteIcon from "../assets/icons/delete.svg"

const NotificationsDropdown = forwardRef(function NotificationsDropdown(
  { open, onClose, anchorRef },
  ref
) {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((state) => state.notifications);
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute -left-[150%] top-full mt-2.5 max-xs:w-72 w-80 min-h-[min(650px,80dvh)] max-h-[min(650px,80dvh)] overflow-auto rounded-md border border-gray-200 bg-white shadow-lg z-50"
      role="dialog"
      aria-label="الإشعارات"
    >
      <div className="flex items-center justify-between px-3 py-2">
        <span className="font-medium">الإشعارات</span>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-0.5 rounded border border-[#5eb756]"
            onClick={() => { dispatch(updateAllNotificationsStatus()) }}
            title="تعيين الكل كمقروء"
          >
            <img src={NotificationReadIcon} alt="mark-all-read" className="w-3 h-3" />
          </button>
          <button
            className="px-3 py-0.5 rounded border border-red-600"
            onClick={() => { dispatch(deleteAllNotifications()) }}
            title="حذف الكل"
          >
            <img src={NotificationDeleteIcon} alt="clear-all" className="w-3 h-3" />
          </button>
        </div>
      </div>

      <ul className="divide-y">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${!n.isView ? "bg-green-50" : ""
              }`}
            onClick={() => {
              navigate(`/orders/${n.orderId}`);
              onClose();
            }}
          >
            <div className="flex gap-3">
              {/* صورة المستخدم */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={n.order?.user?.image}
                  alt={n.order?.user?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* معلومات الإشعار */}
              <div className="flex-1 min-w-0">
                {/* العنوان */}
                <div className="text-sm font-semibold text-gray-900">
                  لديك طلب جديد
                </div>

                {/* التفاصيل */}
                <div className="text-xs text-gray-600 mt-0.5">
                  قام <span className="font-medium text-gray-800">{n.order?.user?.name}</span>{" "}
                  بعمل طلب جديد. رقم الطلب هو{" "}
                  <span className="font-medium text-gray-800">
                    {n.order?.orderNumber}
                  </span>
                </div>

                {/* التاريخ */}
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {formatDate(n.createdAt)}
                </div>
              </div>

              {/* الأزرار */}
              <div
                className="flex items-center justify-center flex-col gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {!n.isView && (
                  <button
                    className="text-xs p-1 rounded border border-[#5eb756] text-[#5eb756] hover:bg-green-50"
                    onClick={() => dispatch(updateNotificationStatus(n.id))}
                    title="تعيين كمقروء"
                  >
                    <img src={NotificationReadIcon} alt="mark-read" className="w-3 h-3" />
                  </button>
                )}
                <button
                  className="text-xs p-1 rounded border border-red-600 text-red-700 hover:bg-red-50"
                  onClick={() => dispatch(deleteNotification(n.id))}
                  title="حذف الإشعار"
                >
                  <img src={NotificationDeleteIcon} alt="delete" className="w-3 h-3" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

});

export default NotificationsDropdown;
