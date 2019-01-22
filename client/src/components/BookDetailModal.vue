<template>
    <div class="modal"
         v-bind:class="{ open: library.isBookDetailModalOpen }"
         tabindex="1" role="dialog" aria-hidden="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title">Book details</h5>
                    <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            v-on:click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p><strong>Title:</strong> {{ library.bookToShow.title}}</p>
                    <p>This book has {{ library.bookToShow.comments ? library.bookToShow.comments.length : 0}} comment{{
                        library.bookToShow.comments && library.bookToShow.comments.length > 1 ? "s" : ""}}.</p>
                    <ul class="list-group">
                        <li class="list-group-item"
                            v-for="comment in library.bookToShow.comments">{{ comment.comment }}</li>
                    </ul>
                    <hr>
                    <form class="d-flex flex-column">
                        <div class="form-group">
                            <input type="text"
                                   class="form-control"
                                   placeholder="Add new comment"
                                   name="new_comment"
                                   v-model="comment"/>
                        </div>
                        <div class="form-group text-right">
                            <button type="button"
                                    class="btn btn-warning"
                                    v-on:click="addNewComment">Add
                            </button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button"
                            class="btn btn-danger"
                            v-on:click="removeBook">Remove book
                    </button>
                    <button
                            type="button"
                            class="btn btn-secondary"
                            v-on:click="closeModal">Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Action, State } from "vuex-class";
    import { ILibraryState } from "../store/library/types";

    const namespace: string = "library";

    @Component
    export default class BookDetailModal extends Vue {
        @State("library")
        public library: ILibraryState;
        public comment: string = "";

        @Action("toggleBookDetailsModal", { namespace })
        private toggleBookDetailsModal: any;

        @Action("addNewComment", { namespace })
        private addComment: any;

        @Action("increaseBookCommentCount", { namespace })
        private increaseBookCommentCount: any;

        @Action("deleteBook", { namespace })
        private deleteBook: any;

        @Action("reportAnError", { namespace })
        private reportAnError: any;

        public closeModal() {
            this.toggleBookDetailsModal(false);
        }

        public async addNewComment(): void {
            if (!this.comment) {
                this.reportAnError(new Error("You forgot to enter you comment!"));
                return;
            }
            const id = this.library.bookToShow ? this.library.bookToShow._id : "no";
            await this.addComment({
                id,
                comment: this.comment
            });
            this.increaseBookCommentCount(id);
            this.comment = "";
        }

        public removeBook() {
            const book = this.library && this.library.bookToShow;
            if (!book) {
                this.reportAnError(new Error("You forgot to enter you comment!"));
                return;
            }
            this.deleteBook(book._id);
        }
    }
</script>

<style scoped>
    .open {
        background-color: rgba(10, 10, 10, 0.8);
        display: block;
    }

    ul.list-group {
        padding-bottom: 48px;
    }
</style>