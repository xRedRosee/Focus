<template>
    <div class="loadingscreen" v-if="loading">
        <img alt="focus logo" class="focus-logo" src="../src/focus-logo.svg">
    </div>
</template>
<script>
export default {
    name: 'Loading',
    data() {
        return {
            loading: true,
        }
    },
    mounted() {
        this.loading = false
    }
}
</script>
<style scoped>
.loadingscreen {
    background-color: var(--white);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 9999;
}

.focus-logo {
    height: 300px;
}

/* -------------------------------------------- media queries  */
/* tablet */
@media (min-width:641px) {
    .focus-logo {
        height: 400px;
    }

}
</style>