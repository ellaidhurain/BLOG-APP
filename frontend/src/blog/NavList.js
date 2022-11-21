import { Route, Routes } from "react-router-dom";
import MyBlogs from "./myBlogs";


export const ListItems = () => {
  const pathArray = [
    { path: "/home", component: <MyBlogs />, id: "home" },
    { path: "/friends", component: <MyBlogs />, id: "friends" },
    { path: "/myblogs", component: <MyBlogs />, id: "myblogs" },
    { path: "/settings", component: <MyBlogs />, id: "settings" },

  ];

  return (
    <Routes>
      {pathArray.map((path) => (
        <Route key={path.id} path={path.path} element={path.component} />
      ))}
    </Routes>
  );
};
