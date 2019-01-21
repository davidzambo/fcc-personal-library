<template>
    <li class="list-group-item d-flex flex-row justify-content-between">
        <span>
            <h4 class="d-inline">
                <strong>Title:</strong> {{book.title}}
            </h4>
            <span class="badge badge-primary badge-pill">{{ renderComments }}</span>
        </span>
        <span class="ml-auto">
            <button v-on:click="showBookDetails(book._id)" class="btn btn-sm btn-primary mr-1">
                view details
            </button>
        </span>
    </li>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Action } from "vuex-class";

    const namespace: string = "library";

    @Component({
        props: {
            book: Object
        }
    })
    export default class Book extends Vue {
        @Action("showBookDetails", { namespace }) public showBookDetails: any;
        public constructor(props: any) {
            super(props);
        }

        public get renderComments() {
            let result = this.$props.book.commentcount;
            result += this.$props.book.commentcount > 1 ? " comments" : " comment";
            return result;
        }
    }
</script>

<style scoped>

</style>