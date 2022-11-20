import React from "react";
import { useCookies } from "react-cookie";

export default function Cookie() {
  const [cookies, setCookie] = useCookies();

  return (
    <div className="App">
      {/* <h1>React cookies</h1> */}
      {cookies.user && <p>{cookies.user}</p>}
    </div>
  );
}