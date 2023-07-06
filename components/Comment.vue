<template>
    <div class="comment">
        <h1 class="comment-user"> {{ user }}</h1>
        <p class="comment-text"> {{ commenttext }}</p>
    </div>
</template>
<script>
export default {
    name: "Comment",
    props: {
        user: String,
        commenttext: String
    }
}
</script>
<style>
.comment {
    width: 95%;
    background-color: var(--white);
    padding-block: 3px;
    margin-block: 5px;
}

.comment-user {
    font-family: var(--gibson);
    font-weight: var(--gibson-regular);
    margin: 0;
    font-size: 20px;
}

.comment-text {
    font-family: var(--gibson);
    font-weight: var(--gibson-light);
    margin: 0;
    font-size: 18px;
}

/* -------------------------------------------- media queries  */
/* tablet */
@media (min-width:641px) {
    .comment-user {
        font-size: 25px;
    }

    .comment-text {
        font-size: 22px;
    }
}
</style>