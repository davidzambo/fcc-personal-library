import { IBook, ILibraryState } from "@/store/library/types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ILibraryState> = {
    SET_BOOKS(state, books: IBook[]) {
        state.hasError = false;
        state.books = books;
    },
    SET_BOOK_TO_SHOW(state, book: IBook) {
        state.bookToShow = book;
        state.isBookDetailModalOpen = true;
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
    TOGGLE_ERROR_MODAL(state, hasError?: boolean) {
      if (typeof hasError === "undefined") {
          state.hasError = !state.hasError;
      } else {
          state.hasError = hasError;
      }
      if (!state.hasError && state.errorMessage) {
          state.errorMessage = undefined;
      }
    },
    INCREASE_BOOK_COMMENT_COUNT(state, id: string) {
        const books = (state as any).books;
        const index = books.findIndex((book: IBook) => book._id === id);
        if (index && books[index]) {
            books[index].commentcount++;
        }
    },
    ADD_NEW_BOOK(state, book: IBook) {
        state.books.push(book);
    },
    DELETE_BOOK(state, id: string) {
        state.books = state.books.filter((book: IBook) => {
            return book._id !== id;
        });
        state.isBookDetailModalOpen = false;
    },
    ERROR_HANDLER(state, error: Error) {
        state.errorMessage = error.message;
        state.hasError = true;
    }
};
