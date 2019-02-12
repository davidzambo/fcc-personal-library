import { mutations } from "@/store/library/mutations";
import { ILibraryState } from "@/store/library/types";
import { IRootState } from "@/store/types";
import { Module } from "vuex";
import { actions } from "./actions";

export const state: ILibraryState = {
    books: [],
    bookToShow: undefined,
    hasError: false,
    isBookDetailModalOpen: false,
    isDescriptionModalOpen: false,
    isAjaxRun: false
};
const namespaced: boolean = true;

export const library: Module<ILibraryState, IRootState> = {
    namespaced,
    state,
    actions,
    mutations
};
