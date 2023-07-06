<template>
    <section class="top-bar">
        <NuxtLink to="/profile" class="return-button">&#8592;</NuxtLink>
        <h1 class="top-bar-title"> EDIT PROFILE </h1>
    </section>
    <div class="edit-form">
        <img alt="profile picture" class="user-img" src="../src/assets/account.svg">
        <span class="form-section">
            <h2 class="form-label"> Real name</h2>
            <input type="text" class="realname-input" :value=this.realname>
        </span>
        <span class="form-section">
            <h2 class="form-label"> Username</h2>
            <input type="text" class="username-input" :value=this.username>
        </span>
        <span class="form-section">
            <h2 class="form-label"> Bio </h2>
            <textarea class="bio-input" :value=this.bio></textarea>
        </span>
        <span class="form-section">
            <h2 class="form-label"> Password </h2>
            <input type="password" class="password-input" :value=this.password>
        </span>
        <div v-if="isSaved">
            <h1 class="change-message"> Changes are saved </h1>
        </div>
        <button class="update-btn" @click="this.updateProfile()"> Save changes</button>
    </div>
</template>
<script>
import gsap from 'gsap';

import axios from 'axios'

export default {
    data() {
        return {
            realname: String,
            username: String,
            bio: String,
            password: String,
            isSaved: false
        }
    },
    methods: {
        getProfile() {
            // get profile from LocalStorage
            const profile = JSON.parse(localStorage.getItem('profile'));

            // fetch data from db 
            fetch('https://focusdb.scarydemon.cf/users/?id=' + profile.id).then(res => res.json()).then(dataa => {
                // fill in values with the data from db
                this.username = dataa[0].user;
                this.realname = dataa[0].name;
                this.bio = dataa[0].bio;
                this.password = dataa[0].password;
            })
        },
        updateProfile() {
            const profile = JSON.parse(localStorage.getItem('profile'));
            const realnameInput = document.querySelector(".realname-input");
            const usernameInput = document.querySelector(".username-input");
            const bioInput = document.querySelector(".bio-input");
            const passwordInput = document.querySelector(".password-input");


            axios.patch('https://focusdb.scarydemon.cf/users/' + profile.id, {
                // Update with the values
                "user": usernameInput.value.toString(),
                "name": realnameInput.value.toString(),
                "bio": bioInput.value.toString(),
                "password": passwordInput.value.toString(),
            }).then(
                // show saved message
                this.isSaved = true,
            ).then(
                // get data with id
                fetch('https://focusdb.scarydemon.cf/users/?id=' + profile.id).then(res => res.json()).then(dataa => {
                    // update the value fields and add to localstorage
                    this.username = dataa[0].user;
                    this.realname = dataa[0].name;
                    this.bio = dataa[0].bio;
                    this.password = dataa[0].password;
                    localStorage.setItem('profile', JSON.stringify(dataa[0]))
                })
            )
            // .then(
            //     axios.patch('http://localhost:3004/users/' + profile.userId + '/posts', {
            //         // Update with the values
            //         "user": usernameInput.value.toString(),
            //     })
            // )
        },
        animations() {
            gsap.fromTo(".edit-form", {
                y: 200,
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

.top-bar-title {
    font-family: var(--centurygothic);
    font-weight: 700;
    font-size: 40px;
    padding: 0;
    margin: 0;
    margin-left: 20px;
}

.user-img {
    height: 90px;
    border: 2px solid black;
    border-radius: 50%;
    padding: 21px;
    margin: 0;
    margin-bottom: 20px;
}

.update-btn {
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

.edit-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-top: 33px;
    margin-bottom: 40px;
}

.realname-input {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
    width: 80%;
    height: 40px;
    padding: 2px;
    outline: none;
    border: none;
    background-color: var(--lightgrey);
}


.username-input {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
    width: 80%;
    height: 40px;
    padding: 2px;
    outline: none;
    border: none;
    background-color: var(--lightgrey);
}

.password-input {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
    width: 80%;
    height: 40px;
    padding: 2px;
    outline: none;
    border: none;
    background-color: var(--lightgrey);
}

.bio-input {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
    width: 80%;
    height: 70px;
    resize: none;
    padding: 2px;
    outline: none;
    border: none;
    background-color: var(--lightgrey);
}

.form-label {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
    width: 80%;
    margin-bottom: 5px;
}

.form-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.change-message {
    font-weight: var(--gibson-light);
    font-size: 20px;
    font-family: var(--gibson);
    color: black;
    margin-top: 20px;
    margin-bottom: -20px;
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

    .update-btn {
        font-size: 28px;
        margin: 0;
        margin-top: 15px;
        height: 51px;
        width: 30%;
    }
}
</style>