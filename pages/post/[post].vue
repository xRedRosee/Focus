<template>
    <NavBar></NavBar>
    <section class="top-bar">
        <NuxtLink to="/" class="return-button">&#8592;</NuxtLink>
        <h1 class="top-bar-title"> COMMENTS </h1>
    </section>
    <section class="post-container">
        <article class="post">
            <div class="user-section">
                <img alt="user image" class="user-img" src="../../src/assets/account.svg">
                <div class="user-data">
                    <h2 class="user-name"> {{ this.user }}</h2>
                    <p class="date"> {{ this.date }}</p>
                </div>
            </div>
            <div class="post-section">
                <p class="post-text"> {{ this.text }} </p>
                <p class="hashtags">{{ this.hashtags }} </p>
            </div>
            <div class="interaction-section">
                <button class="like-btn" @click="checkLike(postId)">
                    <p class="like-text"> {{ this.totalLikes }}</p>
                    <img alt="like" class="like-img" src="../../src/assets/heart.svg" v-if="!IsLiked">
                    <img alt="like" class="liked-img" src="../../src/assets/heart-filled.svg" v-else-if="IsLiked">
                </button>
                <button class="comment-btn">
                    <p class="comment-text"> {{ this.commentscount }}</p>
                    <img alt="comment" class="comment-img" src="../../src/assets/comment.svg">
                </button>
            </div>
            <div class="comment-section">
                <Comment v-for="c in commentList" :user="c.user" :commenttext="c.body"></Comment>
            </div>
            <div class="add-comment-section">
                <input type="text" placeholder="Add a comment..." class="comment-input" id="comment-input">
                <button class="send-btn" @click="addComment(postId)">
                    <img src="../../src/assets/send.svg" alt="send button" class="send-img">
                </button>
            </div>
        </article>
    </section>
</template>
<script>
import axios from 'axios'
import NavBar from '~/components/NavBar.vue';
import Comment from '~/components/Comment.vue';

export default {
    setup() {
        const route = useRoute()
    },
    data() {
        return {
            pageName: "",
            user: "",
            date: "",
            text: "",
            hashtags: "",
            likes: Number,
            commentscount: Number,
            postId: Number,
            IsLiked: Boolean,
            totalLikes: this.likes,
            commentList: []
        }
    },
    methods: {
        checkSlug() {
            this.pageName = this.$route.params.post;
            this.getData(this.pageName);
            this.getComments(this.pageName);
        },
        async getData(pageName) {
            //import JSON data
            fetch('https://focusdb.scarydemon.cf/posts/').then(res => res.json()).then(dataa => {

                // set JSON data in array
                const myArray = dataa;

                //for each object in the array
                for (var i = 0; i < myArray.length; i++) {

                    //if the object is equal to the page
                    if (myArray[i].id == pageName) {
                        //set variables to the JSON data
                        this.text = myArray[i].text;
                        this.user = myArray[i].user;
                        this.hashtags = myArray[i].hashtags;
                        this.likes = myArray[i].likes;
                        this.IsLiked = myArray[i].liked;
                        this.postId = myArray[i].id;
                        this.totalLikes = myArray[i].likes;
                        this.changeHeart()
                    }
                }
            })
        },
        async getComments(id) {
            // get comments from a post
            fetch('https://focusdb.scarydemon.cf/posts/' + id + '/comments').then(res => res.json()).then(dataa => {
                // set comments count to the length of the array
                this.commentList = dataa;
                this.commentscount = dataa.length;
            })
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
        },
        addComment(id) {
            // get input from comment input field
            const commentInput = document.getElementById("comment-input");
            const profile = JSON.parse(localStorage.getItem('profile'));

            // get comments from a specific posts by id
            fetch('https://focusdb.scarydemon.cf/posts/' + id + '/comments', {
                // make POST request and change body to the comment input
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "body": commentInput.value.toString(),
                    "user": profile.user,
                    "userId": profile.userId,
                    "postId": id
                })
            })
                // call getComments function to update comments count in template
                .then(() => { this.getComments(id) })

            return commentInput.value = ''
        }
    },
    mounted() {
        this.checkSlug()
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

.top-bar-title {
    font-family: var(--centurygothic);
    font-weight: 700;
    font-size: 40px;
    padding: 0;
    margin: 0;
    margin-left: 20px;
}

.return-button {
    text-decoration: none;
    font-size: 40px;
    color: black;
    margin-left: 5px;
}

.post-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
}

.post {
    width: 95%;
    background-color: var(--lightgrey);
    padding-block: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding-bottom: 150px;
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
    color: black;
    outline: none;
    border: none;
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

.comment-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}

.add-comment-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 120px;
    justify-content: center;
}

.comment-input {
    padding: 0;
    outline: none;
    border: none;
    height: 40px;
    width: 80%;
    padding-inline: 5px;
    font-size: 16px;
    font-family: var(--gibson);
    font-weight: var(--gibson-book);
    -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.61);
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.61);
}

.send-btn {
    outline: none;
    border: none;
    background-color: var(--lightblue);
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.61);
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.61);
}

.send-img {
    height: 30px
}


/* -------------------------------------------- media queries  */
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


    .comment-input {
        height: 50px;
        width: 85%;
        font-size: 22px;
    }

    .send-btn {
        height: 60px;
        width: 60px;
    }

    .send-img {
        height: 40px;
    }
}
</style>