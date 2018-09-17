<template>
    <form
        @submit.prevent="onSubmit">
        <input
                type="text"
                v-model="title"
                @change="onChange"/>
        <button>TestTheForm</button>
        <p>{{ message }}</p>
    </form>
</template>

<script lang="ts">
    import axios from "axios";
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        props: {
            message: String
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