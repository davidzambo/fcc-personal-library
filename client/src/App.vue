<template>
    <div id="app" class="container-fluid">
        <PageTitle @toggleDescription="toggleDescription"/>
        <ProjectDescription v-if="isDescriptionOpen"/>
        <Library v-bind:books="books"/>
        <Footer/>
    </div>
</template>

<script lang="ts">
    import axios from "axios";
    import Vue from "vue";
    import Component from "vue-class-component";
    import Footer from "./components/Footer.vue";
    import Form from "./components/Form.vue";
    import Library from "./components/Library.vue";
    import PageTitle from "./components/PageTitle.vue";
    import ProjectDescription from "./components/ProjectDescription.vue";

    @Component({
        components: {
            PageTitle,
            Footer,
            Form,
            Library,
            ProjectDescription
        }
    })
    export default class App extends Vue {
        public hasError: boolean = false;
        public isDescriptionOpen: boolean = false;
        public errorMessages: string[] = [];
        public books: object[] = [];

        public async created() {
            try {
                const response = await axios.get("/api/books/");
                if (response.data.books) {
                    this.books = response.data.books;
                }
            } catch (e) {
                //tslint:disable
                console.log(e);
                this.hasError = true;
                this.errorMessages.push(e);
            }
        }

        public toggleDescription () {
            this.isDescriptionOpen = !this.isDescriptionOpen;
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
