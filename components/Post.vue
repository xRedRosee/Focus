<template>
    <article class="box post">
        <div class="user-section">
            <img alt="user image" class="user-img" src="../src/assets/account.svg">
            <div class="user-data">
                <h2 class="user-name"> {{ user }}</h2>
                <p class="date"> {{ date }}</p>
            </div>
        </div>
        <div class="post-section">
            <p class="post-text"> {{ text }} </p>
            <p class="hashtags">{{ hashtags }} </p>
        </div>
        <div class="interaction-section">
            <button class="like-btn" @click="checkLike(postId)">
                <p class="like-text"> {{ totalLikes }}</p>
                <img alt="like" class="like-img" src="../src/assets/heart.svg" v-if="!IsLiked">
                <img alt="like" class="liked-img" src="../src/assets/heart-filled.svg" v-else-if="IsLiked">
            </button>
            <NuxtLink class="comment-btn" :to="sluglink">
                <p class="comment-text"> {{ updatedCommentCount }}</p>
                <img alt="comment" class="comment-img" src="../src/assets/comment.svg">
            </NuxtLink>
        </div>
    </article>
</template>
<script>
import gsap from 'gsap';

import axios from 'axios'

export default {
    name: "Post",
    setup() {
        const route = useRoute()
    },
    data() {
        return {
            IsLiked: this.liked,
            totalLikes: this.likes,
            updatedCommentCount: this.commentscount
        }
    },
    mounted() {
        this.animation()
        this.getComments(this.postId)
    },
    props: {
        user: String,
        date: String,
        text: String,
        hashtags: String,
        likes: Number,
        liked: Boolean,
        commentscount: Number,
        postId: Number,
        sluglink: String
    },
    methods: {
        animation() {
            gsap.fromTo(".post", {
                scale: 0.5,
                duration: 1
            }, {
                scale: 1
            });
        },
        likePost(id) {
            // get data from a post
            fetch('https://focusdb.scarydemon.cf/posts/' + id).then(res => res.json()).then(data => {
                //update likes with + 1
                let updatedLikes = data.likes + 1;
                // PATCH request to update the likes & liked boolean in db
                axios.patch("https://focusdb.scarydemon.cf/posts/" + id, {
                    likes: updatedLikes,
                    liked: true
                })
                    // change heart and change total likes in template
                    .then(() => this.changeHeart()).then(() => this.totalLikes = updatedLikes).then(() => this.IsLiked = true)
                    .then((error) => console.log(error));
            })

        },
        async getComments(id) {
            // get comments from a specific posts
            fetch('https://focusdb.scarydemon.cf/posts/' + id + '/comments').then(res => res.json()).then(dataa => {
                // update comments count
                this.updatedCommentCount = dataa.length;
            })
        },
        unlikePost(id) {
            // get data from a post
            fetch('https://focusdb.scarydemon.cf/posts/' + id).then(res => res.json()).then(data => {
                //update likes with 1 1
                let updatedLikes = data.likes - 1;
                // PATCH request to update the likes & liked boolean in db
                axios.patch("https://focusdb.scarydemon.cf/posts/" + id, {
                    likes: updatedLikes,
                    liked: false
                })
                    // change heart and change total likes in template
                    .then(() => this.changeHeart()).then(() => this.totalLikes = updatedLikes).then(() => this.IsLiked = false)
                    .then((error) => console.log(error));
            })

        },
        changeHeart() {
            if (!this.IsLiked) {
                // change boolean 
                this.IsLiked = false;
                return
            } else {
                // change boolean 
                this.IsLiked = true;
                return
            }
        },
        checkLike(id) {
            if (!this.IsLiked) {
                // call like function
                this.likePost(id)
                return;
            } else {
                // call unlike function
                this.unlikePost(id)
                return;
            }
        }
    }
}

</script>
<style>
.post {
    width: 95%;
    background-color: var(--lightgrey);
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.20);
    box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.20);
}

.user-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}

.user-img {
    height: 30px;
    margin-left: 20px;
}

.user-data {
    margin-left: 20px;
}

.user-name {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
}

.date {
    font-family: var(--gibson);
    font-weight: var(--gibson-light);
    color: var(--dark-grey);
    margin: 0;
    font-size: 18px;
}

.post-section {
    width: 90%;
}

.post-text {
    font-family: var(--gibson);
    font-weight: var(--gibson-book);
    color: var(--black);
    font-size: 18px;
}

.hashtags {
    font-family: var(--gibson);
    font-weight: var(--gibson-book);
    color: var(--dark-grey);
    font-size: 18px;
}

.interaction-section {
    width: 90%;
    display: flex;
    justify-content: flex-start;
    gap: 20px;
}

.like-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 30px;
    background-color: var(--lighterblue);
    outline: none;
    border: none;
}

.like-text {
    font-family: var(--centurygothic);
    font-weight: 800;
    font-size: 18px;
}

.like-img {
    height: 30px;
    margin-left: 5px;
}

.liked-img {
    height: 30px;
    margin-left: 5px;
}

.comment-btn {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    width: 20%;
    height: 30px;
    background-color: var(--lighterblue);
    text-decoration: none;
    color: black
}

.comment-text {
    font-family: var(--centurygothic);
    font-weight: 800;
    font-size: 18px;
}

.comment-img {
    height: 20px;
    margin-left: 5px;
}

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

    .user-name {
        font-size: 30px;
    }

    .date {
        font-size: 22px;
    }

    .post-text {
        font-size: 25px;
    }

    .hashtags {
        font-size: 22px;
    }

    .like-btn {
        height: 40px;
    }

    .like-text {
        font-size: 25px;
    }

    .like-img {
        height: 38px;
        margin-left: 14px;
    }

    .liked-img {
        height: 38px;
        margin-left: 14px;
    }

    .comment-btn {
        height: 40px;
    }

    .comment-text {
        font-size: 25px;
    }

    .comment-img {
        height: 28px;
        margin-left: 14px;
    }
}
</style>