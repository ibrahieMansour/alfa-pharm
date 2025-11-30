import { toast } from "react-toastify";

export const toastService = {
  loading(message = "جاري التحميل...") {
    return toast.loading(message);
  },

  info(message = "جاري التحميل...") {
    toast.info(message, {
      autoClose: 1500,
      closeButton: true,
    });
  },

  success(id, message = "تمت العملية بنجاح") {
    toast.update(id, {
      render: message,
      type: "success",
      isLoading: false,
      autoClose: 1500,
      closeButton: true
    });
  },

  error(id, message = "حدث خطأ ما") {
    toast.update(id, {
      render: message,
      type: "error",
      isLoading: false,
      autoClose: 1500,
      closeButton: true
    });
  }
};