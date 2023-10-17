import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import requestApi from "../const/api";
import { useDispatch } from "react-redux";
import { setAuth } from "../utils/layoutSlice";
import { setUserIngrData } from "../utils/fridgeIngrSlice";

function useAuthStatus() {
  const { pathname } = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const setAuthStatus = async () => {
      try {
        const checkLoginResult = await requestApi("get", "/check-login");
        dispatch(setAuth(checkLoginResult.isAuthenticated));
        setIsAuth(checkLoginResult.isAuthenticated);
        setIsAuthUser(checkLoginResult.user);
      } catch (err) {}
    };
    const getUserIngrData = async () => {
      try {
        const userIngrData = await requestApi("get", "/myfridge");
        dispatch(setUserIngrData(userIngrData));
      } catch (err) {}
    };
    setAuthStatus();
    getUserIngrData();
  }, [dispatch, pathname]);

  return {
    isAuth,
    isAuthUser,
  };
}

export default useAuthStatus;
