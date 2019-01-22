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
    TOGGLE_ERROR_MODAL(state, hasError?: boolean) {
      if (typeof hasError === "undefined") {
          state.hasError = !state.hasError;
      } else {
          state.hasError = hasError;
      }
    },
    INCREASE_BOOK_COMMENT_COUNT(state, id: string) {
        const books = state.books;
        if (books) {
            const index = books.findIndex((book: IBook) => book._id === id);
            if (index) {
                if (books[index]) {
                    if (books[index].commentcount) {
                        books[index].commentcount++;
                    }
                }
            }
        }
    },
    ADD_NEW_BOOK(state, book: IBook) {
        state.books.push(book);
    },
    DELETE_BOOK(state, id: string) {
        let books = state.books;
        books = books.filter((book: IBook) => {
            return book._id !== id;
        });
        state.books = books;
        state.isBookDetailModalOpen = false;
    },
    ERROR_HANDLER(state, error: Error) {
        // tslint:disable-next-line
        console.log(error);
        state.hasError = true;
        state.errorMessage = error.message;
    }
};
