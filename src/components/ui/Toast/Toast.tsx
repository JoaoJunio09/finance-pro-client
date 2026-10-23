import toast from "react-hot-toast";
import ToastView, { type ToastProps } from "./ToastView";

function showToast({ title, message, type, duration }: ToastProps) {
  toast.custom((t) => <ToastView t={t} title={title} message={message} type={type} />, {
    duration,
  });
}

export default showToast;
