import * as React from "react";

export const ListItem = ({ label, children }) => (
  <li className="flex py-1 justify-between md:justify-start items-center">
    <div className="font-semibold mr-3">{label}:</div>
    <div className="">{children}</div>
  </li>
);
