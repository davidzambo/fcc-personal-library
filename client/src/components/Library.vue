<template>
    <div>
        <h3>Books in your library:</h3>
        <ul class="list-group">
            <Book v-for="book in library.books"
                  :key="book.id"
                  v-bind:book="book"/>
        </ul>
        <BookDetailModal
                v-if="library.isBookDetailModalOpen"
                v-bind:book="library.bookToShow"
                v-bind:isOpen="library.isBookDetailModalOpen"/>
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
        @State("library")
        public library: ILibraryState;

        @Action("fetchBookList", { namespace })
        public fetchBookList: any;

        public mounted() {
            this.fetchBookList();
        }
    }
</script>


<style scoped>

</style>