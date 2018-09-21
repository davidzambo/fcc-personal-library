<template>
    <footer class="row bg-dark text-white p-4">
        <div class="col-12">
            <a href="https://www.dcmf.hu/">
                codedBy<img src="https://www.dcmf.hu/images/dcmf-letters.png"/>
            </a>
        </div>
    </footer>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({})
    export default class Footer extends Vue {
    }
</script>

<style scoped>
    img {
        max-height: 1.5rem;
        width: auto;
    }
    a, a:active, a:visited {
        color: white;
        text-decoration: none;
    }
</style>