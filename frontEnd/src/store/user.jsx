import { atom } from "recoil";
export const userAtom=atom({
    key:"userAtom",
    default: {
        mobNo: '',
        name: '',
        isAdmin: false,
    },
})