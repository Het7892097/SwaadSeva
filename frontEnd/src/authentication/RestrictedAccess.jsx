import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RestrictedAccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', fontSize: '2rem', margin: '20px' }}>
      <p>This page is not accessible. You will be redirected to the home page.</p>
    </div>
  );
};

export default RestrictedAccess;
