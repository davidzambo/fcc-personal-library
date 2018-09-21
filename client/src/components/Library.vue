<template>
    <div>
        <h3>Books in your library:</h3>
        <ul class="list-group" v-for="book in books">
            <Book v-bind:book="book"/>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Book from "./Book.vue";

    @Component({
        props: {
            books: Array,
        },
        components: {
            Book,
        }
    })
    export default class Library extends Vue {
    }
</script>

<style scoped>

</style>