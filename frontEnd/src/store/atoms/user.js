import axios from "axios";
import { header } from "framer-motion/m";
import { atom, selector } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: {
    mobNo: "",
    name: "",
    isAdmin: false,
  },
});
