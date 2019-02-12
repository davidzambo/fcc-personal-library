<template>
    <div id="app" class="container-fluid" v-bind:class="{noScroll: library.isBookDetailModalOpen || library.hasError}">
        <PageTitle/>
        <ProjectDescription v-bind:isOpen="library.isDescriptionModalOpen"/>
        <Library/>
        <Footer/>
        <ErrorModal v-bind:hasError="library.hasError"
                    v-bind:errorMessage="library.errorMessage"/>
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { State } from "vuex-class";
    import ErrorModal from "./components/ErrorModal.vue";
    import Footer from "./components/Footer.vue";
    import Library from "./components/Library.vue";
    import PageTitle from "./components/PageTitle.vue";
    import ProjectDescription from "./components/ProjectDescription.vue";
    import { ILibraryState } from "./store/library/types";

    @Component({
        components: {
            ErrorModal,
            PageTitle,
            Footer,
            Library,
            ProjectDescription
        },
    })
    export default class App extends Vue {
        @State("library")
        public library: ILibraryState;

        public updated() {
            const body = document.querySelector("body");
            if (body) {
                if (this.library.isBookDetailModalOpen || this.library.hasError) {
                    body.classList.add("modal-open");
                } else {
                    body.classList.remove("modal-open");
                }
            }
        }
    }
</script>

<style lang="scss">
    html {
        height: 100%;
    }

    body {
        height: 100%;
    }

    #app {
        @import url('https://fonts.googleapis.com/css?family=Overlock+SC');
        font-family: 'Overlock SC', cursive;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 20px;;
    }
    .modal-open {
        overflow: hidden;
    }
    .library {
        flex-grow: 1;
    }
</style>
