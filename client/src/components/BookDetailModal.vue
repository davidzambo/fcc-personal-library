<template>
    <div class="modal" v-bind:class="{ open: isOpen }" id="book-details" tabindex="1" role="dialog" aria-hidden="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
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
                    <p><strong>Title:</strong> {{ book.title}}</p>
                    <p>This book has {{ book.comments && book.comments.length }} comments.</p>
                    <ul v-for="comment in book.comments">
                        <li>{{ comment.comment }}</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button
                            type="button"
                            class="btn btn-secondary"
                            v-on:click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from "axios";
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        props: {
            isOpen: Boolean,
            book: Object,
            toggleModal: Function
        }
    })
    export default class BookDetailModal extends Vue {
        public book: object = {};
        public isUpdated: boolean = false;

        public closeModal() {
            this.$props.toggleModal();
        }

        public async updated() {
            if (this.$props.isOpen && !this.isUpdated) {
                try {
                    const response: any = await axios.get(`/api/books/${this.$props.book._id}`);

                    if (typeof response.data.book === "string") {
                        throw new Error(response.data.book);
                    }
                    this.book = response.data.book;
                    this.isUpdated = true;
                    //tslint:disable
                    console.log(response);
                } catch (e) {
                    alert(e.message);
                }
            } else {
                this.isUpdated = false;
            }
        }
    }
</script>

<style scoped>
    .open {
        background-color: rgba(10,10,10,0.8);
        display: block;
    }
</style>