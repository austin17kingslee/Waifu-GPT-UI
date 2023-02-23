import React from "react";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "src/app/components/Commons/ErrorPage/ErrorPage";
import GlobalModals from "src/app/components/Commons/Modals/GlobalModals";
import { ParallaxProvider } from 'react-scroll-parallax';
import RoutesWithTransition from "./RoutesWithTransition";

export default function App() {
  // useFetchingData();
  // useSettingUpAccount();
  return (
    <div className="app">
      <ParallaxProvider>
        <ErrorPage>
          <BrowserRouter>
            <RoutesWithTransition />
          </BrowserRouter>
          <GlobalModals/>
        </ErrorPage>
      </ParallaxProvider>
    </div>
  );
}
