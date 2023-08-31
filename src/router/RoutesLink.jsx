import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./Router";

export default function RoutesLink() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={routes[0].layout}>
            {routes[0].children.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}
