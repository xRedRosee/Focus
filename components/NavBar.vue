<template>
    <nav class="navbar">
        <ul class="nav-list">
            <li class="nav-item">
                <NuxtLink to="/" class="nav-text">
                    <img src="../src/assets/home.svg" alt="home" class="nav-icon">
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink to="/createpost" class="nav-text-create">
                    <img src="../src/assets/create.svg" alt="create post" class="nav-icon-big">
                </NuxtLink>
            </li>
            <li class="nav-item">
                <NuxtLink to="/profile" class="nav-text">
                    <img src="../src/assets/account.svg" alt="profile" class="nav-icon">
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name: "NavBar",
    setup() {
        const route = useRoute()
    },

}
</script>
<style scoped>
.navbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--white);
    z-index: 999;
    padding-block: 5px;
    -webkit-box-shadow: 0px -5px 19px -6px rgba(0, 0, 0, 0.22);
    box-shadow: 0px -5px 19px -6px rgba(0, 0, 0, 0.22);
}

.nav-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 40px;
}

.nav-item {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-text {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: var(--lighterblue);
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav-text-create {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    background-color: var(--lightblue);
    display: flex;
    justify-content: center;
    align-items: center;
}


.nav-icon {
    height: 40px;
}

.nav-icon-big {
    height: 60px;
}

/* -------------------------------------------- media queries  */
/* smartphones */
@media (min-width:320px) {}

/* smartphones */
@media (min-width:481px) {}

/* tablet */
@media (min-width:641px) {}

/* bigger tablet */
@media (min-width:961px) {}
</style>