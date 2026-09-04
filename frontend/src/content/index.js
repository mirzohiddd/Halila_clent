// Segmentlar ro'yxati. Yangi segment: fayl yarating va shu yerga qo'shing.
import umumiy from "./umumiy.js";
import kokrak from "./kokrak.js";
import oshqozon from "./oshqozon.js";
import miya from "./miya.js";
import bachadon from "./bachadon.js";
import prostata from "./prostata.js";
import opka from "./opka.js";
import qon from "./qon.js";
import jigar from "./jigar.js";
import qizilongach from "./qizilongach.js";

export const articles = [umumiy, kokrak, oshqozon, miya, bachadon, prostata, opka, qon, jigar, qizilongach];

export const defaultArticle = umumiy;

export function findArticle(path) {
  const clean = "/" + String(path || "").replace(/^\/+|\/+$/g, "");
  return articles.find((a) => a.path === clean) || null;
}

export { umumiy, kokrak, oshqozon, miya, bachadon, prostata, opka, qon, jigar, qizilongach };
