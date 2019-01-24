<template>
    <header class="row">
        <div class="col-12 text-center">
            <h1>
                Personal Library
                <sup v-on:click="toggleDescriptionModal">
                    <i class="fas fa-info-circle ml-2 text-info" id="description"></i>
                </sup>
            </h1>
        </div>
    </header>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { Action } from "vuex-class";
    const namespace: string = "library";

    @Component({})
    export default class PageTitle extends Vue {
        @Action("toggleDesctiptionModal", { namespace })
        public toggleDescriptionModal: any;
    }
</script>

<style scoped>
</style>