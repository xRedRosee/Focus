<template>
    <Loading></Loading>
    <NavBar></NavBar>
    <section class="top-bar">
        <h1 class="top-bar-title"> HOME </h1>
        <NuxtLink to="/search" class="search">
            <img alt="search button" class="search-icon" src="../src/assets/search1.svg">
        </NuxtLink>
    </section>
    <progress max="100" value="0"></progress>
    <div class="posts">
        <Post v-for="p in postList" :key="p.id" :user="p.user" :date="p.date" :text="p.text" :hashtags="p.hashtags"
            :commentscount="p.commentscount" :likes="p.likes" :postId="p.id" :liked="p.liked" :sluglink="`/post/` + p.id"
            class="post box">
        </Post>
    </div>
</template>
<script>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

import NavBar from '~/components/NavBar.vue';
import Post from '~/components/Post.vue';
import Loading from '~/components/Loading.vue';

export default {
    data() {
        return {
            postList: [],
        }
    },
    mounted() {
        this.getData();
        this.animations()
    },
    methods: {
        async getData() {
            // fetch posts
            await fetch('https://focusdb.scarydemon.cf/posts/')
                .then(res => res.json()).then(dataa =>
                    this.postList = dataa.reverse()
                )
        },
        animations() {
            gsap.to('progress', {
                value: 100,
                ease: 'none',
                scrollTrigger: { scrub: 0.3 }
            });
        }
    }
}
</script>
<style>
@import url("https://use.typekit.net/yfh1jbf.css");

:root {
    --white: white;
    --lightgrey: #F5F5F5;
    --lightblue: #A9CAEE;
    --lighterblue: #D9E5F1;
    --black: black;
    --gibson: "canada-type-gibson", sans-serif;
    --gibson-light: "200";
    --gibson-book: "300";
    --gibson-regular: "400";
    --centurygothic: "century-gothic", sans-serif;
    --century-regular: "400";
    --century-bold: "800";
    --dark-grey: rgba(117, 115, 115, 1);
}

.top-bar {
    width: 100%;
    background-color: var(--white);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    -webkit-box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.20);
    box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.20);
}

.top-bar-title {
    font-family: var(--centurygothic);
    font-weight: 700;
    font-size: 50px;
    padding: 0;
    margin: 0;
    margin-left: 20px;
}

.search {
    text-decoration: none;
    margin-right: 20px;
}

.search-icon {
    height: 40px;
}

.posts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    padding-bottom: 150px;
}

progress {
    position: fixed;
    top: 0;
    left: 0;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 15px;
    border: none;
    background: transparent;
    z-index: 9999;
}

progress::-webkit-progress-bar {
    background: transparent;
}

progress::-webkit-progress-value {
    background: linear-gradient(to left, var(--lightblue), var(--lighterblue));
    background-attachment: fixed;
}

progress::-moz-progress-bar {
    background: linear-gradient(to left, var(--lightblue), var(--lighterblue));
    background-attachment: fixed;
}



/* -------------------------------------------- media queries  */
/* smartphones */
@media (min-width:320px) {}

/* smartphones */
@media (min-width:481px) {
    .top-bar {
        height: 71px;
    }

    .top-bar-title {
        font-size: 40px;
    }
}

/* tablet */
@media (min-width:641px) {
    .top-bar {
        height: 94px;
    }

    .top-bar-title {
        font-size: 50px;
    }
}

/* bigger tablet */
@media (min-width:961px) {}
</style>