<template>
    <NavBar></NavBar>
    <section class="top-bar">
        <h1 class="top-bar-title"> CREATE POST </h1>
    </section>
    <section class="create-section">
        <article class="post">
            <div class="user-section">
                <img alt="user image" class="user-img" src="../src/assets/account.svg">
                <div class="user-data">
                    <h2 class="user-name"> {{ user }}</h2>
                    <p class="date"> {{ date }}</p>
                </div>
            </div>
            <div class="text-section">
                <textarea placeholder="add text..." class="text-input" requered="true"></textarea>
            </div>
            <div class="hashtag-section">
                <textarea placeholder="add hashtags..." class="hashtags-input" requered="true"></textarea>
            </div>
            <div class="img-section">
                <input type="file" class="custom-file-input">
            </div>
            <div v-if="isEmpty">
                <h1 class="error-message"> Please fill in all fields </h1>
            </div>
        </article>
        <input type="submit" class="post-btn" @click="createPost()" to="/" value="POST">
    </section>
</template>
<script>
import gsap from 'gsap';

import NavBar from '~/components/NavBar.vue';

export default {
    data() {
        return {
            isEmpty: false,
            user: "",
            date: ""
        }
    },
    methods: {
        // create post
        createPost() {
            // get input from texts and hashtags fields
            const textInput = document.querySelector(".text-input");
            const hashtagsInput = document.querySelector(".hashtags-input");
            const profile = JSON.parse(localStorage.getItem('profile'));
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;

            // if they are empty, set isEmpty to true
            if (textInput.value == '' && hashtagsInput.value == '') {
                this.isEmpty = true;
                return
            }

            // fetch posts
            fetch('https://focusdb.scarydemon.cf/posts/', {
                // make POST request
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "text": textInput.value.toString(),
                    "user": profile.user,
                    "userId": profile.userId,
                    "date": formattedToday,
                    "hashtags": hashtagsInput.value.toString(),
                    "likes": 0,
                    "liked": false,
                    "commentscount": 0,
                })
            }).then(navigateTo('/'))

        },
        update() {
            const profile = JSON.parse(localStorage.getItem('profile'));
            this.user = profile.user;
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedToday = dd + '/' + mm + '/' + yyyy;
            this.date = formattedToday;
        },
        animations() {
            gsap.fromTo(".post", {
                scale: 0.5,
                duration: 1
            }, {
                scale: 1
            });

            gsap.fromTo(".post-btn", {
                scale: 0.5,
                duration: 1
            }, {
                scale: 1
            });

        }
    },
    mounted() {
        this.update()
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

.top-bar-title {
    font-family: var(--centurygothic);
    font-weight: 700;
    font-size: 40px;
    padding: 0;
    margin: 0;
    margin-left: 20px;
}

.create-section {
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
    padding-bottom: 50px;
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

.text-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.text-input {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 18px;
    resize: none;
    padding: 0;
    height: 250px;
    width: 90%;
    margin-top: 20px;
    border: none;
    outline: none;
    padding: 10px;
}

.hashtag-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.hashtags-input {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 18px;
    resize: none;
    padding: 0;
    height: 100px;
    width: 90%;
    margin-top: 20px;
    border: none;
    outline: none;
    padding: 10px;
}

.img-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.custom-file-input {
    color: transparent;
    margin-top: 20px;
    width: 95%;
}

/* .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
} */

.custom-file-input::before {
    content: 'Add image';
    color: black;
    display: inline-block;
    background: white;
    border: none;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: var(--gibson-light);
    font-size: 18px;
    font-family: var(--gibson);
    width: 100%;
    text-align: center;
}

/* .custom-file-input:active {
    outline: 0;
}

.custom-file-input:active::before {
    background: white;
} */

.post-btn {
    outline: none;
    border: none;
    background-color: var(--lightblue);
    font-family: var(--gibson);
    font-weight: 700;
    color: var(--black);
    margin: 0;
    font-size: 22px;
    width: 70%;
    height: 40px;
    border-radius: 25px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-message {
    font-weight: var(--gibson-light);
    font-size: 20px;
    font-family: var(--gibson);
    color: rgb(156, 0, 0);
    margin-top: 20px;
    margin-bottom: -20px;
}

/* -------------------------------------------- media queries  */
@media (min-width:300px) {
    .create-section {
        margin-bottom: 100px;
    }
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

    .text-input {
        font-size: 22px;
        height: 300px;
    }

    .hashtags-input {
        font-size: 22px;
    }

    .custom-file-input::before {
        font-size: 22px;
        padding: 15px 8px;
    }
}
</style>