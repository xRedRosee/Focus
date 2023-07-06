<template>
    <div class="landingpage">
        <img alt="focus logo" src="../src/focus-logo.svg" class="focus-logo">
        <section class="login-section">
            <input type="text" placeholder="username" class="username-input">
            <input type="password" placeholder="password" class="password-input">
            <div v-if="isEmpty">
                <h1 class="error-message"> Please fill in all fields </h1>
            </div>
            <div v-if="noUser">
                <h1 class="error-message"> Incorrect username </h1>
            </div>
            <div v-if="isWrong">
                <h1 class="error-message"> Incorrect password </h1>
            </div>
            <input type="submit" value="LOG IN" class="login" @click="login()">
        </section>
        <section class="register-section">
            <h2 class="register-text"> Don't have an account yet? <br> Register below </h2>
            <input type="submit" value="REGISTER" class="register" @click="register()">
        </section>
    </div>
</template>
<script>
import gsap from 'gsap';

export default {
    data() {
        return {
            isEmpty: false,
            isWrong: false,
            noUser: false
        }
    },
    methods: {
        animation() {
            var tl = gsap.timeline();

            gsap.fromTo(".login-section", {
                x: -120,
                duration: 1
            }, {
                x: 0
            });


            gsap.fromTo(".register-section", {
                x: 120,
                duration: 1,
            }, {
                x: 0
            });

            tl.fromTo(".focus-logo", { duration: 1, scale: 1.4 }, { duration: 1, scale: 1 });
        },
        login() {
            // variables for input fields
            const usernameInput = document.querySelector(".username-input");
            const passwordInput = document.querySelector(".password-input");

            // if they are empty, set isEmpty to true
            if (usernameInput.value == '' && passwordInput.value == '') {
                this.isEmpty = true;
                return
            }

            // fetch users
            fetch('https://focusdb.scarydemon.cf/users/?user=' + usernameInput.value)
                .then(res => res.json()).then(dataa => {
                    // if no user is found, show error message
                    if (dataa == '') {
                        this.noUser = true;
                        return
                    } else {
                        this.noUser = false;
                        // check if password input matches password from db
                        if (dataa[0].password == passwordInput.value) {
                            // log in if password matches
                            this.isWrong = false;

                            localStorage.setItem('profile', JSON.stringify(dataa[0]))

                            navigateTo('/')
                        } else {
                            // show error message if password doesn't match
                            this.isWrong = true;
                            return
                        }
                    }
                })
        },
        register() {
            navigateTo('/register')
        },
    },
    mounted() {
        this.animation()
    }

}
</script>
<style scoped>
.landingpage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.focus-logo {
    height: 350px;
    margin-top: 20px;
}

.login-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-top: -66px;
}

.username-input {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
    width: 70%;
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
    width: 70%;
    height: 40px;
    padding: 2px;
    outline: none;
    border: none;
    background-color: var(--lightgrey);
}

.login {
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

.register-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-top: 70px;
    margin-bottom: 30px;
}

.register-text {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    color: var(--black);
    margin: 0;
    font-size: 22px;
    text-align: center;
}

.register {
    outline: none;
    border: none;
    background-color: var(--lighterblue);
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

    .login {
        font-size: 26px;
        width: 60%;
        height: 48px;
        padding: 4px;
        margin-top: 32px;
    }

    .register-text {
        font-size: 26px;
    }

    .register {
        font-size: 26px;
        width: 60%;
        height: 48px;
        padding: 4px;
        margin-top: 32px;
    }
}
</style>