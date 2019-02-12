<template>
    <div class="library py-4 my-4">
        <h3 class="pb-2">Books in your library:</h3>
        <ul class="list-group">
            <Book v-for="book in library.books"
                  :key="book.id"
                  v-bind:book="book"/>
        </ul>
        <BookDetailModal/>
        <hr>
        <form @submit.prevent class="text-right">
            <div class="form-group">
                <input type="text"
                        class="form-control"
                        placeholder="Add new book"
                        v-model.trim="newBook">
            </div>
            <button v-if="!library.isAjaxRun"
                    type="button"
                    class="btn btn-warning btn-sm"
                    @click="addNewBook">Add book
            </button>
            <button v-if="library.isAjaxRun"
                    type="button"
                    class="btn btn-warning btn-sm">
                <i class="fas fa-circle-notch fa-spin"></i> loading
            </button>
        </form>
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Action, State } from "vuex-class";
    import { ILibraryState } from "../store/library/types";
    import Book from "./Book.vue";
    import BookDetailModal from "./BookDetailModal.vue";

    const namespace: string = "library";

    @Component({
        components: {
            BookDetailModal,
            Book,
        },
    })
    export default class Library extends Vue {
        public newBook: string = "";
        @State("library")
        public library: ILibraryState;

        @Action("addNewBook", { namespace })
        private addBook: any;

        @Action("reportAnError", { namespace })
        private reportAnError: any;

        @Action("fetchBookList", { namespace })
        private fetchBookList: any;

        @Action("toggleAjaxRun", { namespace })
        private toggleAjaxRun: any;


        public mounted() {
            this.fetchBookList();
        }

        public async addNewBook() : Promise<any> {
            if (!this.newBook) {
                this.reportAnError(new Error("You forgot to enter the title of the book!"));
                return;
            }
            this.toggleAjaxRun();

            await this.addBook(this.newBook);

            this.newBook = "";

            setTimeout(() => {
                this.toggleAjaxRun();
            }, 100);
        }
    }
</script>


<style scoped>
</style>