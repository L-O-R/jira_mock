import React, { useEffect } from "react";
import useNotificationStore from "../../store/notificationStore";
const NotificationModel = () => {
  const {
    open,
    message,
    closeNotification,
    color,
    duration,
  } = useNotificationStore();

  // useEffect(() => {
  //   if (open) {
  //     open(true);
  //   }
  // }, [open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(
        () => closeNotification(),
        duration
      );
      return () => clearTimeout(timer);
    }
  }, [open, closeNotification]);

  // Don't render anything if not notifying
  if (!open) {
    return null;
  }

  return (
    <div
      className={`fixed top-10 right-10 z-[1000] ${color} p-6 rounded-xl transition-all duration-300 ease-in-out transform ${
        open
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}>
      {message}
    </div>
  );
};

export default NotificationModel;
