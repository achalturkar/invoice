// src/routes/routeMapper.js
import * as Pages from "../pages";

export const resolveComponent = (name) => {
  return Pages[name];
};
