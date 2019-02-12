import { ILibraryState } from "@/store/library/types";
import { IRootState } from "@/store/types";
import axios from "axios";
import { ActionTree } from "vuex";


export const actions: ActionTree<ILibraryState, IRootState> = {
    async fetchBookList({commit}) : Promise<any> {
        try {
            const response = await axios.get("/api/books/");
            return commit("SET_BOOKS", response.data.books);
        } catch (e) {
            commit("ERROR_HANDLER", e);
        }
    },
    async addNewBook({commit}, title: string) : Promise<any> {
      try {
          const response = await axios.post("/api/books/", {title});
          if (response.status === 201) {
              return commit("ADD_NEW_BOOK", response.data.book);
          }
          return commit("ERROR_HANDLER");
      } catch (e) {
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
    toggleAjaxRun({commit}) {
        commit("TOGGLE_AJAX_RUN");
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
            commit("ERROR_HANDLER", e);
        }
    },
    increaseBookCommentCount({commit}, id: string) {
        commit("INCREASE_BOOK_COMMENT_COUNT", id);
    },
    async deleteBook({commit}, id: string) : Promise<any> {
      try {
          const response = await axios.delete(`/api/books/${id}`);
          if (response.data.error) {
              return commit("ERROR_HANDLER", new Error(response.data.error || response.data));
          }
          commit("DELETE_BOOK", id);
      } catch (e) {
          // e.message || e.response.data || e.response.data.error
          const message = e.message && e.response.data.error || e.response.data;
          commit("ERROR_HANDLER", new Error(message));
      }
    },
    async showBookDetails({commit}, id: string) : Promise<any> {
        try {
            const response = await axios.get(`/api/books/${id}`);
            commit("SET_BOOK_TO_SHOW", response.data.book);
        } catch (e) {
            commit("ERROR_HANDLER", e);
        }
    }
};
