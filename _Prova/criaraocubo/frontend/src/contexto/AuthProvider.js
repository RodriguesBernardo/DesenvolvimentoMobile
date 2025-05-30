import React from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = React.useState(null);
  const [carregando, setCarregando] = React.useState(true);

  // Simula carregamento inicial
  React.useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const value = {
    usuario,
    carregando,
    setUsuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}