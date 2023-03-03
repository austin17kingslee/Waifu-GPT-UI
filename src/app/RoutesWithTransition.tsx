import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Summon from './components/Summon/Index';
import ComingSoon from './components/ComingSoon/Index';
import Home from './components/Home/Home';
import { ROUTE } from './configs/constants';

export default function RoutesWithTransition() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes>
          {/* <Route path={ROUTE.HOME} element={<Home/>} /> */}
          <Route path={ROUTE.HOME} element={<ComingSoon/>} />
          <Route path={ROUTE.SUMMON} element={<Summon/>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}