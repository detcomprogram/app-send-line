import { atom } from "recoil";

export const mobileStore = atom({
    key:'keyMobile',
    default: false,
})
export const hideActiveStore = atom({
    key:'keyHideActive',
    default: false,
})

