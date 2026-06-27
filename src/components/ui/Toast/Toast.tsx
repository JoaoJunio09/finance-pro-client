import { AlertTriangle, CheckCircle2, Info, TrendingUp, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'finance';

interface ToastProps {
  title: string,
  message: string,
  type: ToastType
}

function Toast({
  t,
  title,
  message,
  type
}: {
  t: any,
  title: string,
  message: string,
  type: ToastType
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function getContextStyles(type: ToastType) {
   switch (type) {
    case 'success':
      return {
        icon:  CheckCircle2,
        bgIcon: '#4ADE8014',
        sidebarColor: '#4ADE80',
        color: '#4ADE80',
      };
    case 'error':
      return {
        icon:  XCircle,
        bgIcon: '#F8717114',
        sidebarColor: '#F87171',
        color: '#F87171',
      };
    case 'warning':
      return {
        icon:  AlertTriangle,
        bgIcon: '#FCD34D14',
        sidebarColor: '#FCD34D',
        color: '#FCD34D',
      };
    case 'info':
      return {
        icon:  Info,
        bgIcon: '#60A5FA14',
        sidebarColor: '#60A5FA',
        color: '#60A5FA',
      };
    case 'finance':
      return {
        icon:  TrendingUp,
        bgIcon: 'rgba(99, 102, 241, 0.12)',
        sidebarColor: '#6366F1',
        color: '#6366F1',
      };
   }
  }

  const { icon: IconComponent, bgIcon, sidebarColor, color } = getContextStyles(type);

  return (
    <div
      className={`
        h-22 min-w-[400px] bg-[#111111] border border-[#2A2A2A]  rounded-2xl overflow-hidden
        
        transition-all duration-300 ease-out
        will-change-transform

        ${mounted && t.visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"}
      `}
    >
      <div
        className={`
          relative h-full w-full px-4 flex justify-between items-center text-white
        `}
      >
        <div className="flex items-stretch justify-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 theme-transition"
            style={{ backgroundColor: bgIcon }}
          >
            <IconComponent size={16} style={{ color: color }} />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="font-semibold text-sm">{title}</p>
            <p className="opacity-50 text-xs">{message}</p>
          </div>
        </div>
        
        <button onClick={() => toast.dismiss(t.id)}>
          <X height={14} className="absolute right-5 top-5 opacity-50 cursor-pointer" />
        </button>

        <div className="absolute bottom-0 left-0 h-full w-1" style={{ background: sidebarColor }}></div>
        <div className="absolute bottom-0 left-0 h-[0.5px] w-full animate-(--animate-toast)" style={{ background: color }}></div>
      </div>
    </div>
  )
}

function showToast({ title, message, type }: ToastProps) {
  toast.custom((t) => (
    <Toast t={t} title={title} message={message} type={type} />
  ));
}

export default showToast;