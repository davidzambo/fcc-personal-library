<template>
    <div>
        <h3>Books in your library:</h3>
        <ul class="list-group" v-for="book in books">
            <Book v-bind:book="book" v-bind:showDetails="showDetails"/>
        </ul>
        <BookDetailModal
                v-bind:book="bookToShow"
                v-bind:isOpen="isBookDetailModalOpen"
                v-bind:toggleModal="toggleOpen"/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Book from "./Book.vue";
    import BookDetailModal from "./BookDetailModal.vue";

    @Component({
        props: {
            books: Array,
        },
        components: {
            BookDetailModal,
            Book,
        }
    })
    export default class Library extends Vue {
        public bookToShow: any;
        public isBookDetailModalOpen: boolean;

        constructor(props: any) {
            super(props);

            this.bookToShow = {
                title: "Lófasz"
            };
            this.isBookDetailModalOpen = false;
        }

        public showDetails(book: any) {
            this.bookToShow = book;
            this.isBookDetailModalOpen = true;
        }

        public toggleOpen() {
            this.isBookDetailModalOpen = !this.isBookDetailModalOpen;
        }
    }
</script>

<style scoped>

</style>