import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

export const App = () => {
  return <Suspense>{useRoutes(routes)}</Suspense>;
};
