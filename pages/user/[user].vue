<template>
    <NavBar></NavBar>
    <div class="user-info">
        <img alt="profile picture" class="user-img" src="../../src/assets/account.svg">
        <h1 class="user-realname"> {{ this.realname }}</h1>
        <h2 class="user-username"> @{{ this.username }}</h2>
        <section class="profile-numbers">
            <div class="followers-section">
                <p class="followers-count"> {{ this.totalFollowers }}</p>
                <h2 class="number-text"> followers </h2>
            </div>
            <div class="following-section">
                <p class="following-count"> {{ this.following }}</p>
                <h2 class="number-text"> following </h2>
            </div>
            <div class="postscount-section">
                <p class="posts-count"> {{ this.postcount }}</p>
                <h2 class="number-text"> posts </h2>
            </div>
        </section>
        <p class="bio"> {{ this.bio }}</p>
        <button class="follow-btn" @click="follow(this.pageName)"> {{ followText }}</button>
    </div>
    <section class="posts">
        <h1 class="posts-h1"> POSTS </h1>
        <Post v-for="p in postMade" :key="p.id" :user="p.user" :date="p.date" :text="p.text" :hashtags="p.hashtags"
            :commentscount="p.commentscount" :likes="p.likes" :postId="p.id" :liked="p.liked" :sluglink="`/post/` + p.id">
        </Post>
    </section>
</template>
<script>
import gsap from 'gsap';

import axios from 'axios'
import NavBar from '~/components/NavBar.vue';
import Post from '~/components/Post.vue';

export default {
    setup() {
        const route = useRoute()
    },
    data() {
        return {
            pageName: "",
            realname: "",
            username: "",
            followers: Number,
            following: "",
            postcount: "",
            bio: "",
            postMade: [],
            isFollowing: false,
            followText: "follow",
            totalFollowers: this.followers
        }
    },
    methods: {
        checkSlug() {
            this.pageName = this.$route.params.user;
            this.getData(this.pageName);
        },
        async getData(pageName) {
            //import JSON data
            fetch('https://focusdb.scarydemon.cf/users/').then(res => res.json()).then(dataa => {

                // set JSON data in array
                const myArray = dataa;

                //for each object in the array
                for (var i = 0; i < myArray.length; i++) {

                    //if the object is equal to the page
                    if (myArray[i].id == pageName) {
                        //set variables to the JSON data
                        this.realname = myArray[i].name;
                        this.username = myArray[i].user;
                        this.totalFollowers = myArray[i].followers;
                        this.following = myArray[i].following;
                        this.bio = myArray[i].bio;
                    }
                }
            }).then(
                // get posts from the user
                fetch('https://focusdb.scarydemon.cf/posts/?userId=' + pageName).then(res => res.json()).then(dataa => {
                    // change post count to length of the posts array
                    this.postMade = dataa.reverse();
                    this.postcount = this.postMade.length;
                }
                )
            )
        },
        follow(pageName) {
            document.querySelector(".follow-btn").innerText = '';

            // if user isn't following
            if (this.isFollowing == false) {
                // change button text to following
                this.followText = 'following'

                // fetch data from the user profile
                fetch('https://focusdb.scarydemon.cf/users/?id=' + pageName).then(res => res.json()).then(dataa => {
                    // update the following count + 1
                    let updatedFollowers = dataa[0].followers + 1;

                    // PATCH reuqest to update the following count in db
                    axios.patch('https://focusdb.scarydemon.cf/users/' + pageName, {
                        followers: updatedFollowers,
                    }).then(this.totalFollowers = updatedFollowers)

                    return this.isFollowing = true
                })
            } else {
                //change button text to follow
                this.followText = 'follow'
                // fetch data from user profile
                fetch('https://focusdb.scarydemon.cf/users/?id=' + pageName).then(res => res.json()).then(dataa => {
                    // update the following count - 1
                    let updatedFollowers = dataa[0].followers - 1;

                    // PATCH request to update the following count in db
                    axios.patch('https://focusdb.scarydemon.cf/users/' + pageName, {
                        followers: updatedFollowers,
                    }).then(this.totalFollowers = updatedFollowers)
                })
                return this.isFollowing = false
            }
        },
        animations() {
            gsap.fromTo(".user-info", {
                y: -200,
                duration: 1
            }, {
                y: 0
            });

            gsap.fromTo(".posts-h1", {
                y: -200,
                duration: 1
            }, {
                y: 0
            });
        }
    },
    mounted() {
        this.checkSlug()
        this.animations()
    }
}
</script>
<style scoped>
.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.user-img {
    height: 90px;
    border: 2px solid black;
    border-radius: 50%;
    padding: 21px;
    margin-top: 6%;
}

.user-realname {
    font-family: var(--gibson);
    font-weight: 600;
    color: var(--black);
    font-size: 24px;
    margin: 0;
    margin-top: 15px;
}

.user-username {
    font-family: var(--gibson);
    font-weight: var(--gibson-book);
    color: var(--black);
    font-size: 22px;
    margin: 0;
    margin-top: 15px;
}

.profile-numbers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 25px;
    gap: 40px;
}

.followers-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.followers-count {
    margin: 0;
    font-family: var(--gibson);
    font-weight: 800;
    color: var(--black);
    font-size: 24px;
}

.number-text {
    margin: 0;
    font-family: var(--gibson);
    font-weight: var(--gibson-book);
    color: var(--black);
    font-size: 22px;
}

.following-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.following-count {
    margin: 0;
    font-family: var(--gibson);
    font-weight: 800;
    color: var(--black);
    font-size: 24px;
}

.postscount-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.posts-count {
    margin: 0;
    font-family: var(--gibson);
    font-weight: 800;
    color: var(--black);
    font-size: 24px;
}

.bio {
    font-family: var(--gibson);
    font-weight: 300;
    color: var(--black);
    font-size: 22px;
    margin: 0;
    margin-top: 15px;
}

.follow-btn {
    font-family: var(--gibson);
    font-weight: 400;
    color: var(--black);
    font-size: 22px;
    margin: 0;
    margin-top: 15px;
    height: 35px;
    width: 50%;
    background-color: var(--lighterblue);
    border: none;
    outline: none;
    border-radius: 10px;
}

.posts {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
}

.posts-h1 {
    font-family: var(--centurygothic);
    font-weight: 700;
    font-size: 30px;
    padding: 0;
    margin: 0;
    width: 90%;
    text-align: left;
}

/* -------------------------------------------- media queries  */
/* tablet */
@media (min-width:641px) {
    .user-img {
        height: 118px;
    }

    .user-realname {
        font-size: 30px;
    }

    .user-username {
        font-size: 28px;
    }

    .followers-count {
        font-size: 30px;
    }

    .following-count {
        font-size: 30px;
    }

    .posts-count {
        font-size: 30px;
    }

    .number-text {
        font-size: 28px;
    }

    .bio {
        font-size: 28px;
    }

    .follow-btn {
        font-size: 28px;
        margin: 0;
        margin-top: 15px;
        height: 51px;
    }

    .posts-h1 {
        font-size: 40px;
    }
}
</style>