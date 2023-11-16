import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import "./App.css";

export const App = () => {
  return <Suspense>{useRoutes(routes)}</Suspense>;
};
