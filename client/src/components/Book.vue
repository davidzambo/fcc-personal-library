<template>
    <li class="list-group-item d-flex flex-row justify-content-between">
        <span>
            <h4 class="d-inline">
                <strong>Title:</strong> {{book.title}}
            </h4>
            <span class="badge badge-primary badge-pill">{{ renderComments }}</span>
        </span>
        <span class="ml-auto">
            <a href="/book/{{book._id}}" class="btn btn-sm btn-primary mr-1">
                view book
            </a>
            <button class="btn btn-sm btn-danger" @click=deleteBook()>delete book</button>
        </span>
    </li>
</template>

<script lang="ts">
    import axios from "axios";
    import Vue from "vue";

    const BookProps = Vue.extend({
        props: {
            book: Object
        }
    });
    export default class Book extends BookProps {

        public get renderComments() {
            let result = this.book.commentcount;
            result += this.book.commentcount > 1 ? " comments" : " comment";
            return result;
        }

        public async deleteBook() {
            //tslint:disable
            console.log(this.book._id);
            try {
                const response = await axios.get(`/api/books/${this.book._id}`);

                // tslint:disable
                console.log(response, this, this.book);
            } catch (e) {
                // tslint:disable
                console.log(e);
            }
        }
    }
</script>

<style scoped>

</style>