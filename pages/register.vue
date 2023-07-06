<template>
    <div class="registerpage">
        <NuxtLink to="/landing" class="return-button">&#8592;</NuxtLink>
        <img alt="focus logo" src="../src/focus-logo.svg" class="focus-logo">
        <h1 class="register-text"> Register and get inspired by other photographers! </h1>
        <section class="register-form">
            <input type="text" placeholder="real name" class="realname-input">
            <input type="text" placeholder="username" class="username-input">
            <textarea placeholder="short bio about yourself" class="bio-input"></textarea>
            <input type="password" placeholder="password" class="password-input">
            <div v-if="isEmpty">
                <h1 class="error-message"> Please fill in all fields </h1>
            </div>
            <input type="submit" value="REGISTER" class="register" @click="register()">
        </section>
    </div>
</template>
<script>
import gsap from 'gsap';

import axios from 'axios'

export default {
    data() {
        return {
            isEmpty: false,
        }
    },
    methods: {
        register() {
            // get input from texts fields
            const realnameInput = document.querySelector(".realname-input");
            const usernameInput = document.querySelector(".username-input");
            const bioInput = document.querySelector(".bio-input");
            const passwordInput = document.querySelector(".password-input");

            // if they are empty, set isEmpty to true
            if (realnameInput.value == '' && usernameInput.value == '' && bioInput.value == '' && passwordInput.value == '') {
                this.isEmpty = true;
                return
            }

            // fetch users
            fetch('https://focusdb.scarydemon.cf/users/', {
                // make POST request
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user": usernameInput.value.toString(),
                    "name": realnameInput.value.toString(),
                    "following": 0,
                    "followers": 0,
                    "bio": bioInput.value.toString(),
                    "password": passwordInput.value.toString(),
                })
            }).then(this.addUserId(usernameInput.value))

        },
        addUserId(user) {
            fetch('https://focusdb.scarydemon.cf/users/?user=' + user).then(res => res.json()).then(dataa => {
                // Get id from user
                const userId = dataa[0].id;

                // make PATCH request
                axios.patch('https://focusdb.scarydemon.cf/users/' + userId, {
                    // add userId with the id 
                    "userId": userId,
                })
            }).then(navigateTo('/landing'))
        },
        animations() {
            var tl = gsap.timeline();

            gsap.fromTo(".register-text", {
                y: -100,
                duration: 1
            }, {
                y: 0
            });

            tl.fromTo(".focus-logo", { duration: 1, scale: 1.4 }, { duration: 1, scale: 1 });

            gsap.fromTo(".register-form", {
                y: 100,
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
.registerpage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.return-button {
    text-decoration: none;
    font-size: 40px;
    color: black;
    position: absolute;
    top: 7px;
    left: 19px;
    z-index: 999;
}

.focus-logo {
    height: 350px;
    margin-top: 20px;
}

.register-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-top: -66px;
    margin-top: 52px;
    margin-bottom: 30px;
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


.register {
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
    margin-top: 30px;
}

.register-text {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
    text-align: center;
    margin-top: -82px;
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
/* tablet */
@media (min-width:641px) {
    .focus-logo {
        height: 380px;
    }

    .username-input {
        font-size: 26px;
        width: 60%;
        height: 48px;
        padding: 4px;
    }

    .password-input {
        font-size: 26px;
        width: 60%;
        height: 48px;
        padding: 4px;
    }

    .bio-input {
        font-size: 26px;
        width: 60%;
        height: 48px;
        padding: 4px;
    }

    .realname-input {
        font-size: 26px;
        width: 60%;
        height: 48px;
        padding: 4px;
    }

    .register {
        font-size: 26px;
        width: 60%;
        height: 48px;
        padding: 4px;
        margin-top: 32px;
    }

    .register-text {
        font-size: 26px;
    }

}
</style>