<template>
    <NavBar></NavBar>
    <button @click="this.logout()" class="logout-btn">
        <img alt="log out button" class="logout-img" src="../src/assets/logout.svg">
    </button>
    <div class="user-info">
        <img alt="profile picture" class="user-img" src="../src/assets/account.svg">
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
        <div class="buttons">
            <button class="edit-btn" @click="this.edit()"> Edit profile</button>
            <button class="share-btn" @click="this.share()"> Share profile</button>
        </div>
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

import NavBar from '~/components/NavBar.vue';

export default {
    data() {
        return {
            realname: "",
            username: "",
            followers: "",
            following: "",
            postcount: "",
            bio: "",
            postMade: [],
            totalFollowers: this.followers
        }
    },
    methods: {
        getProfile() {
            const profile = JSON.parse(localStorage.getItem('profile'));

            fetch('https://focusdb.scarydemon.cf/users/?id=' + profile.id).then(res => res.json()).then(dataa => {
                this.username = dataa[0].user;
                this.realname = dataa[0].name;
                this.totalFollowers = dataa[0].followers;
                this.following = dataa[0].following;
                this.bio = dataa[0].bio;
            })

            // get posts from the user
            fetch('https://focusdb.scarydemon.cf/posts/?userId=' + profile.userId).then(res => res.json()).then(dataa => {
                // change post count to length of the posts array
                this.postMade = dataa.reverse();
                this.postcount = this.postMade.length;
            }
            )
        },
        logout() {
            alert("You sure you want to log out?")
            localStorage.removeItem('profile')
            navigateTo('/landing')
        },
        edit() {
            navigateTo('/editprofile')
        },
        share() {
            // Get the text field
            var copyText = 'Focus.nl'

            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText);

            // Alert the copied text
            alert("Link copied to clipboard");
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
        this.getProfile()
        this.animations()
    }
}
</script>
<style scoped>
.logout-btn {
    background-color: var(--lighterblue);
    outline: none;
    border: none;
    height: 44px;
    width: 44px;
    border-radius: 50%;
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    z-index: 9999;
}

.logout-img {
    height: 30px;
}

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
    margin: 0;
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

.buttons {
    display: flex;
    width: 100%;
    gap: 20px;
    justify-content: center;
}

.edit-btn {
    font-family: var(--gibson);
    font-weight: 400;
    color: var(--black);
    font-size: 22px;
    margin: 0;
    margin-top: 15px;
    height: 35px;
    width: 40%;
    background-color: var(--lighterblue);
    border: none;
    outline: none;
    border-radius: 10px;
}


.share-btn {
    font-family: var(--gibson);
    font-weight: 400;
    color: var(--black);
    font-size: 22px;
    margin: 0;
    margin-top: 15px;
    height: 35px;
    width: 40%;
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

    .edit-btn {
        font-size: 28px;
        margin: 0;
        margin-top: 15px;
        height: 51px;
        width: 30%;
    }

    .share-btn {
        font-size: 28px;
        margin: 0;
        margin-top: 15px;
        height: 51px;
        width: 30%;
    }

    .posts-h1 {
        font-size: 40px;
    }

    .logout-btn {
        height: 55px;
        width: 55px;
    }

    .logout-img {
        height: 45px;
    }
}
</style>