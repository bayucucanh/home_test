// src/components/Auth.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { setUser, setToken, logout } from '../authSlice';
import { setUser, setToken, logout } from '@/store/reducers/authSlice';
import jwt_decode from 'jwt-decode'; // Menggunakan library jwt-decode

function Auth({ token }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      dispatch(setUser(decodedToken.user));
      dispatch(setToken(token));
    } else {
      dispatch(logout());
    }
  }, [token, dispatch]);

  return null; // Tidak ada tampilan yang dirender
}
export default Auth;
