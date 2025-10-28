function AdminLogin({ onLogin }) {
  try {
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === 'anderson') {
        sessionStorage.setItem('admin_auth', 'true');
        onLogin();
      } else {
        setError('Неверный пароль');
        setPassword('');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-black" data-name="admin-login" data-file="components/AdminLogin.js">
        <div className="bg-white p-10 rounded-lg shadow-2xl max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-light mb-2">ANDERS</h1>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Admin Panel</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-300 p-3 focus:outline-none focus:border-black"
                placeholder="Введите пароль"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminLogin error:', error);
    return null;
  }
}