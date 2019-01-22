<template>
    <div class="library">
        <h3>Books in your library:</h3>
        <ul class="list-group">
            <Book v-for="book in library.books"
                  :key="book.id"
                  v-bind:book="book"/>
        </ul>
        <BookDetailModal/>
        <hr>
        <form>
            <div class="form-group">
                <input type="text"
                        class="form-control"
                        placeholder="Add new book"
                        v-model="newBook">
            </div>
            <button type="button"
                    class="btn btn-warning"
                    v-on:click="addNewBook">Add book</button>
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

        public mounted() {
            this.fetchBookList();
        }

        public addNewBook() : void {
            if (!this.newBook) {
                this.reportAnError(new Error("You forgot to enter the title of the book!"));
                return;
            }
            this.addBook(this.newBook);
            this.newBook = "";
        }
    }
</script>


<style scoped>
</style>