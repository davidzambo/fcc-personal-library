<template>
    <div id="app" class="container-fluid">
        <PageTitle/>
        <ProjectDescription v-if="library.isDescriptionModalOpen"/>
        <Library/>
        <Footer/>
        <ErrorModal/>
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
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 20px;
    }
    .library {
        flex-grow: 1;
    }
</style>
