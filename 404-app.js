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
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-white text-black">
              Перезагрузить
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function NotFoundApp() {
  try {
    return (
      <div data-name="404-app" data-file="404-app.js">
        <Error404 />
      </div>
    );
  } catch (error) {
    console.error('NotFoundApp error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <NotFoundApp />
  </ErrorBoundary>
);