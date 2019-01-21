import { IBook, ILibraryState } from "@/store/library/types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ILibraryState> = {
    SET_BOOKS(state, books: IBook[]) {
        state.hasError = false;
        state.books = books;
    },
    SET_BOOK_TO_SHOW(state, book: IBook) {
        state.bookToShow = book;
    },
    TOGGLE_DESCRIPTION_MODAL(state, isOpen?: boolean) {
        if (typeof isOpen === "undefined") {
            state.isDescriptionModalOpen = !state.isDescriptionModalOpen;
        } else {
            state.isDescriptionModalOpen = isOpen;
        }
    },
    TOGGLE_BOOK_DETAIL_MODAL(state, isOpen?: boolean) {
        if (typeof isOpen === "undefined") {
            state.isBookDetailModalOpen = !state.isBookDetailModalOpen;
        } else {
            state.isBookDetailModalOpen = isOpen;
        }
    },
    INCREASE_BOOK_COMMENT_COUNT(state, id: string) {
        const books = state.books;
        if (books) {
            const index = books.findIndex((book: IBook) => book._id === id);
            if (index && books[index] && books[index].commentcount) {
                books[index].commentcount++;
            }
        }
    },
    ERROR_HANDLER(state, error: Error) {
        state.hasError = true;
        state.errorMessage = error.message;
    }
};
