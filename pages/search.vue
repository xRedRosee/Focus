<template>
    <NavBar></NavBar>
    <section class="top-bar">
        <NuxtLink to="/" class="return-button">&#8592;</NuxtLink>
        <div class="search-section">
            <input type="image" class="search-button" @click="search()" src="/search1.svg">
            <input type="text" placeholder="search for posts or users" class="search-input">
        </div>
    </section>
    <section class="output-section">
        <ProfileBar v-for="pr in profileList" :key="pr.id" :username="pr.user" :realname="pr.name"
            :sluglink="`/user/` + pr.id"></ProfileBar>
        <Post v-for="p in postList" :key="p.id" :user="p.user" :date="p.date" :text="p.text" :hashtags="p.hashtags"
            :commentscount="p.commentscount" :likes="p.likes" :postId="p.id" :liked="p.liked" :sluglink="`/post/` + p.id">
        </Post>
        <div v-if="noOutput">
            <h1 class="error-message"> No posts/users found. </h1>
        </div>
    </section>
</template>
<script>
import gsap from 'gsap';

import NavBar from '~/components/NavBar.vue';
import ProfileBar from '~/components/ProfileBar.vue';
import Post from '~/components/Post.vue';

export default {
    data() {
        return {
            profileList: [],
            postList: [],
            noOutput: false
        }
    },
    methods: {
        search() {
            const searchInput = document.querySelector('.search-input')

            // search for users
            fetch('https://focusdb.scarydemon.cf/users/?user=' + searchInput.value).then(res => res.json()).then(dataa => {
                // add to array
                this.profileList = dataa;
            }).then(
                // search for posts
                fetch('https://focusdb.scarydemon.cf/posts/?user=' + searchInput.value).then(res => res.json()).then(dataa => {
                    // add to array
                    this.postList = dataa;

                    //check if both arrays are empty
                    if (this.profileList.length == 0 && this.postList.length == 0) {
                        // if so then no output
                        this.noOutput = true;
                        return;
                    } else {
                        this.noOutput = false;
                        return;
                    }
                })
            )
            return searchInput.value = '';
        },
        animations() {
            gsap.fromTo(".top-bar", {
                y: -200,
                duration: 1
            }, {
                y: 0
            });
        }
    },
    mounted() {
        this.animations()
    }
}
</script>
<style scoped>
.top-bar {
    width: 100%;
    background-color: var(--white);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 100px;
    -webkit-box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.20);
    box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.20);
}

.return-button {
    text-decoration: none;
    font-size: 40px;
    color: black;
    margin-left: 5px;
}

.search-section {
    display: flex;
    align-items: center;
    width: 80%;
    position: relative;
    margin-left: 20px;
}

.search-button {
    background: none;
    border: none;
    outline: none;
    position: absolute;
    left: 5px;
    height: 30px;
}

.search-img {
    height: 30px;
}

.search-input {
    background-color: var(--lightgrey);
    border: none;
    outline: none;
    padding: 5px;
    height: 33px;
    width: 80%;
    padding-left: 50px;
    border-radius: 25px;
    font-size: 18px;
}

.output-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    padding-bottom: 150px;
}

.error-message {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
}

/* -------------------------------------------- media queries  */
/* smartphones */
@media (min-width:481px) {
    .top-bar {
        height: 71px;
    }

}

/* tablet */
@media (min-width:641px) {
    .top-bar {
        height: 94px;
    }


    .search-button {
        left: 19px;
        height: 40px;
    }

    .search-input {
        height: 47px;
        width: 90%;
        padding-left: 69px;
        border-radius: 25px;
        font-size: 22px;
    }
}
</style>