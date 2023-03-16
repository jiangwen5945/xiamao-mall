<template>
    <div class="error-container">
        <div class="glitch_word_box">
            <div class="line"></div>
            <h1 id="word" class="glitch_word0">404 - page not found</h1>
            <h1 id="word1" class="glitch_word1">404 - page not found</h1>
            <h1 id="word2" class="glitch_word2">404 - page not found</h1>
        </div>
    </div>

</template>
<script>
export default {
  name: 'ErrorView'
}
</script>
<style scoped lang="less">
.error-container {
    background-color: rgba(20, 20, 20, 1);
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

h1 {
    color: #f5f5f5;
    font-weight: bolder;
    font-size: 5em;
    margin: 0;
    outline: none;
    padding: 0;
    position: relative;
}

.glitch_word_box {
    height: 100px;
    width: 600px;
    margin: auto;
    line-height: 100px;
    position: relative;
    animation: disappear 1s linear;
    animation-iteration-count: infinite, infinite;
}

.glitch_word_box .glitch_word0 {
    position: absolute;
    width: 100%;
}

.glitch_word_box .glitch_word1 {
    color: red;
    font-weight: bolder;
    left: -2px;
    position: absolute;
    top: -2px;
    width: 100%;
    z-index: -1;
    animation: animate_glitch_1 .2s linear;
    animation-iteration-count: infinite;
}

.glitch_word_box .glitch_word2 {
    color: blue;
    font-weight: bolder;
    left: 2px;
    position: absolute;
    top: 2px;
    width: 100%;
    z-index: -1;
    animation: animate_glitch_2 .3s linear;
    animation-iteration-count: infinite;
}

@keyframes disappear {
    0% {
        opacity: 0;
    }

    2% {
        opacity: 1;
    }
}

@keyframes animate_glitch_1 {
    0% {
        top: 1px;
        left: 1px;
    }

    25% {
        top: 3px;
        left: 2px;
    }

    50% {
        top: -1px;
        left: -4px;
    }

    75% {
        top: 2px;
        left: 5px;
    }

    100% {
        top: 1px;
        left: -2px;
    }
}

@keyframes animate_glitch_2 {
    0% {
        top: -1px;
        left: -1px;
    }

    25% {
        top: -3px;
        left: -2px;
    }

    50% {
        top: 1px;
        left: 4px;
    }

    100% {
        top: -1px;
        left: -1px;
    }
}
</style>
