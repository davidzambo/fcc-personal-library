<template>
    <form
        class="card"
        @submit.prevent="onSubmit">
        <div class="form-group">
            <input
                    class="form-control"
                    type="text"
                    v-model="title"
                    placeholder="Title"
                    @change="onChange"/>
        </div>
        <button
            class="btn btn-primary">
            Post a book
        </button>
    </form>
</template>

<script lang="ts">
    import axios from "axios";
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        props: {
            title: String,
            action: String
        }
    })
    export default class Form extends Vue {
        public title = "new";

        public onChange( event: any, msg: any) {
            //tslint:disable
            console.log(event, msg);
        }

        public async onSubmit () {
            try {
                const response = await axios.post("/api/books/", {
                    data: this.$data
                });
                console.log(response);
            } catch (e) {
                alert(e.message);
            }
        }
    }
</script>

<style scoped>

</style>