class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Что-то пошло не так</h1>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-black text-white">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminApp() {
  try {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
      const auth = sessionStorage.getItem('admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }, []);

    if (!isAuthenticated) {
      return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
      <div className="min-h-screen" data-name="admin-app" data-file="admin-app.js">
        <AdminPanel onLogout={() => {
          sessionStorage.removeItem('admin_auth');
          setIsAuthenticated(false);
        }} />
      </div>
    );
  } catch (error) {
    console.error('AdminApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <AdminApp />
  </ErrorBoundary>
);