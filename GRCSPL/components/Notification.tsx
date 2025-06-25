
import React from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

type NotificationProps = {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onClose?: () => void;
};

const notificationConfig = {
  success: {
    icon: CheckCircle,
    bgClass: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200/50",
    textClass: "text-emerald-800",
    iconClass: "text-emerald-600",
    closeClass: "text-emerald-500 hover:text-emerald-700"
  },
  error: {
    icon: AlertCircle,
    bgClass: "bg-gradient-to-r from-red-50 to-rose-50 border-red-200/50",
    textClass: "text-red-800",
    iconClass: "text-red-600",
    closeClass: "text-red-500 hover:text-red-700"
  },
  info: {
    icon: Info,
    bgClass: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200/50",
    textClass: "text-blue-800",
    iconClass: "text-blue-600",
    closeClass: "text-blue-500 hover:text-blue-700"
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200/50",
    textClass: "text-amber-800",
    iconClass: "text-amber-600",
    closeClass: "text-amber-500 hover:text-amber-700"
  }
};

export const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  onClose,
}) => {
  const config = notificationConfig[type];
  const IconComponent = config.icon;

  return (
    <div className={`
      relative w-full max-w-sm sm:max-w-md md:max-w-lg
      rounded-2xl border backdrop-blur-sm
      px-4 py-3 sm:px-5 sm:py-4
      shadow-lg shadow-black/5
      transition-all duration-500 ease-out
      hover:shadow-xl hover:shadow-black/10
      hover:scale-[1.02] hover:-translate-y-1
      ${config.bgClass}
    `}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">
          <IconComponent 
            size={18} 
            className={`${config.iconClass} drop-shadow-sm`} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`
            text-sm sm:text-base font-medium leading-relaxed
            ${config.textClass}
          `}>
            {message}
          </p>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className={`
              flex-shrink-0 p-1 rounded-full
              transition-all duration-200 ease-out
              hover:bg-white/50 hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current
              ${config.closeClass}
            `}
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};