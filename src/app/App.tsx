import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE } from "src/app/configs/constants";
import ErrorPage from "src/app/components/Commons/ErrorPage/ErrorPage";
import Home from "src/app/components/Home/Home";
import GlobalModals from "src/app/components/Commons/Modals/GlobalModals";
import { ParallaxProvider } from 'react-scroll-parallax';

export default function App() {
  // useFetchingData();
  // useSettingUpAccount();

  return (
    <div className="app">
      <ParallaxProvider>
        <ErrorPage>
            <BrowserRouter>
              <Routes>
                <Route path={ROUTE.HOME} element={<Home/>} />
              </Routes>
            </BrowserRouter>
            <GlobalModals/>
        </ErrorPage>
      </ParallaxProvider>
    </div>
  );
}
