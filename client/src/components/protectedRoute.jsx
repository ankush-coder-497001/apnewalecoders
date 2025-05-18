import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('Apne-wale-coders-token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
