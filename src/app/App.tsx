import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE } from "src/app/configs/constants";
import useSettingUpAccount from "src/app/hooks/useSettingUpAccount";
import ErrorPage from "src/app/components/Commons/ErrorPage/ErrorPage";
import useFetchingData from "src/app/hooks/useFetchingData";
import Header from "src/app/components/Layout/Header";
import Footer from "src/app/components/Layout/Footer";
import Home from "src/app/components/Home/Home";
import GlobalModals from "src/app/components/Commons/Modals/GlobalModals";
import { ParallaxProvider } from 'react-scroll-parallax';

export default function App() {
  useFetchingData();
  useSettingUpAccount();

  return (
    <div className="app">
      <ParallaxProvider>
        <ErrorPage>
            <Header/>
            <BrowserRouter>
              <Routes>
                <Route path={ROUTE.HOME} element={<Home/>} />
                {/*<Route path="knights" element={<Users />}>
                  <Route path="me" element={<OwnUserProfile />} />
                  <Route path=":id" element={<UserProfile />} />
                </Route>*/}
              </Routes>
            </BrowserRouter>
            <Footer/>
            <GlobalModals/>
        </ErrorPage>
      </ParallaxProvider>
    </div>
  );
}
