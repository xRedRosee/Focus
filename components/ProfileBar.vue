<template>
    <NuxtLink class="box profile-bar" :to="sluglink">
        <img alt="user image" class="user-img" src="../src/assets/account.svg">
        <div class="user-data">
            <h2 class="real-name"> {{ realname }}</h2>
            <p class="user-name"> @{{ username }}</p>
        </div>
    </NuxtLink>
</template>
<script>
import gsap from 'gsap';

export default {
    setup() {
        const route = useRoute()
    },
    name: "ProfileBar",
    props: {
        realname: String,
        username: String,
        sluglink: String
    },
    methods: {
        animation() {
            gsap.fromTo(".profile-bar", {
                scale: 0.5,
                duration: 1
            }, {
                scale: 1
            });
        }
    },
    mounted() {
        this.animation()
    }
}
</script>
<style scoped>
.profile-bar {
    width: 95%;
    background-color: var(--lightgrey);
    padding-block: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    -webkit-box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.20);
    box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.20);
    text-decoration: none;
}

.user-img {
    height: 30px;
    margin-left: 20px;
}

.user-data {
    margin-left: 20px;
}

.real-name {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
}

.user-name {
    font-family: var(--gibson);
    font-weight: 700;
    color: var(--black);
    margin: 0;
    font-size: 22px;
}

/* -------------------------------------------- media queries  */
/* tablet */
@media (min-width:641px) {
    .user-img {
        height: 40px;
    }

    .real-name {
        font-size: 28px;
    }

    .user-name {
        font-size: 28px;
    }
}
</style>