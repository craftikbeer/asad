function Notification({ message, type = 'success', onClose }) {
  try {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    const icons = {
      success: 'check-circle',
      error: 'alert-circle',
      info: 'info'
    };

    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    };

    return (
      <div
        className={`fixed top-24 right-6 ${colors[type]} text-white px-6 py-4 rounded shadow-2xl z-[100] animate-slide-up flex items-center gap-3 max-w-md`}
        data-name="notification"
        data-file="components/Notification.js"
      >
        <div className={`icon-${icons[type]} text-xl`}></div>
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="ml-4 hover:opacity-70">
          <div className="icon-x text-lg"></div>
        </button>
      </div>
    );
  } catch (error) {
    console.error('Notification error:', error);
    return null;
  }
}