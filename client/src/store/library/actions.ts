import { ILibraryState } from "@/store/library/types";
import { IRootState } from "@/store/types";
import axios from "axios";
import { ActionTree } from "vuex";


export const actions: ActionTree<ILibraryState, IRootState> = {
    async fetchBookList({commit}) : Promise<any> {
        try {
            const response = await axios.get("/api/books/");
            commit("SET_BOOKS", response.data.books);
        } catch (e) {
            // tslint:disable-next-line
            console.log(e.message);
            commit("ERROR_HANDLER", e);
        }
    },
    async addNewBook({commit}, title: string) : Promise<any> {
      try {
          const response = await axios.post("/api/books/", {
              title
          });
          if (response.status === 201) {
              commit("ADD_NEW_BOOK", response.data.book);
          } else {
              commit("ERROR_HANDLER");
          }
      } catch (e) {
          // tslint:disable-next-line
          console.log(e.message);
          commit("ERROR_HANDLER", e);
      }
    },
    toggleDesctiptionModal({commit}) {
        commit("TOGGLE_DESCRIPTION_MODAL");
    },
    toggleBookDetailsModal({commit}) {
        commit("TOGGLE_BOOK_DETAIL_MODAL");
    },
    toggleErrorModal({commit}, isOpen?: boolean) {
        commit("TOGGLE_ERROR_MODAL", isOpen);
    },
    reportAnError({commit}, error: Error) {
        commit("ERROR_HANDLER", error);
    },
    async addNewComment({commit}, {
        id,
        comment,
    }) : Promise<any> {
        try {
            const response: any = await axios.post(`/api/books/${id}`, {
                comment
            });
            commit("SET_BOOK_TO_SHOW", response.data.book);
        } catch (e) {
            // tslint:disable-next-line
            console.log(e.message);
            commit("ERROR_HANDLER", e);
        }
    },
    increaseBookCommentCount({commit}, id: string) {
        commit("INCREASE_BOOK_COMMENT_COUNT", id);
    },
    async deleteBook({commit}, id: string) : Promise<any> {
      try {
          await axios.delete(`/api/books/${id}`);
          commit("DELETE_BOOK", id);
      } catch (e) {
          // tslint:disable-next-line
          console.log(e.message);
          commit("ERROR_HANDLER", e);
      }
    },
    async showBookDetails({commit}, id: string) : Promise<any> {
        try {
            const response = await axios.get(`/api/books/${id}`);
            commit("SET_BOOK_TO_SHOW", response.data.book);
            commit("TOGGLE_BOOK_DETAIL_MODAL", true);
        } catch (e) {
            // tslint:disable-next-line
            console.log(e.message);
            commit("ERROR_HANDLER", e);
        }
    }
};
