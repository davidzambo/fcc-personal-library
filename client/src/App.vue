<template>
    <div id="app" class="container-fluid">
        <PageTitle/>
        <ProjectDescription v-if="library.isDescriptionModalOpen"/>
        <Library/>
        <Footer/>
    </div>
</template>
<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import { State } from "vuex-class";
    import Footer from "./components/Footer.vue";
    import Library from "./components/Library.vue";
    import PageTitle from "./components/PageTitle.vue";
    import ProjectDescription from "./components/ProjectDescription.vue";
    import { ILibraryState } from "./store/library/types";

    @Component({
        components: {
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
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 20px;
    }
</style>
