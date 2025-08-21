import React, { useEffect, useState } from "react";

const NotificationModel = ({
  state = false,
  children,
  duration = 3000,
  onClose,
}) => {
  const [notify, setNotify] = useState(state);
  console.log(notify);
  useEffect(() => {
    if (state) {
      setNotify(true);
    }
  }, [state]);

  useEffect(() => {
    if (notify) {
      const timer = setTimeout(() => {
        setNotify(false);
        // Call onClose callback if provided
        if (onClose) {
          onClose();
        }
      }, duration);

      // Cleanup timer on unmount or when notify changes
      return () => clearTimeout(timer);
    }
  }, [notify, duration, onClose]);

  // Don't render anything if not notifying
  if (!notify) {
    return null;
  }

  return (
    <div
      className={`fixed top-10 right-10 z-[1000] bg-accent p-6 rounded-xl transition-all duration-300 ease-in-out transform ${
        notify
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}>
      {children}
    </div>
  );
};

export default NotificationModel;
