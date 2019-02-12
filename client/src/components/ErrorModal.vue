<template>
    <div class="modal"
         v-if="hasError"
         tabindex="1" role="dialog" aria-hidden="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title"><span class="sad-face">: (</span>Something went wrong...</h5>
                    <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            v-on:click="closeModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body pt-4 pb-5">
                    {{ errorMessage }}
                </div>
                <div class="modal-footer">
                    <button
                            type="button"
                            class="btn btn-secondary"
                            v-on:click="closeModal">OK
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Action } from "vuex-class";

    const namespace: string = "library";

    @Component({
        props: {
            hasError: Boolean,
            errorMessage: String
        }
    })
    export default class ErrorModal extends Vue {
        @Action("toggleErrorModal", { namespace })
        private toggleErrorModal: any;

        public closeModal() : void {
            this.toggleErrorModal(false);
        }
    }
</script>

<style scoped>
    .modal {
        display: block;
        background: rgba(0,0,0,0.8);
    }
    .sad-face {
        font-size: 120%;
        font-weight: bold;
        padding-right: 1rem;
    }
</style>