<script lang="ts">
    import TypingArea from "../components/TypingArea.svelte"
    import ThemeToggle from "../components/ThemeToggle.svelte"

    let typingArea: any
    ;
</script>

<div class="gradient-bg">
    <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>

    <div class="gradients-container">
        <div class="g1"></div>
        <div class="g2"></div>
        <div class="g3"></div>
        <div class="g4"></div>
        <div class="g5"></div>
    </div>
</div>
<div class="top-0 left-0 justify-between absolute h-svh w-full flex flex-col items-center text-foreground selection:bg-accent-light dark:selection:bg-accent-dark selection:text-foreground-light dark:selection:text-foreground-dark">
    <div>
        <ThemeToggle/>
    </div>

    <h1 class="text-[3.5rem] text-secondary-light dark:text-secondary-dark font-bold [text-shadow:0px_0px_25px_var(--tw-shadow-color)] shadow-neutral-300/40 dark:shadow-neutral-900/40">
        Chucktype<span class="text-unfocused-light dark:text-unfocused-dark">.</span><span class="text-accent-light dark:text-accent-dark">svelte</span>
    </h1>

    <TypingArea
        bind:this={typingArea}
    />

    <div  class="flex flex-col gap-3 items-center">
        <button
            onclick={typingArea.startCountdown}
            class="w-fit font-[600] px-4 py-1 outline outline-[3px] bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-md drop-shadow-lg backdrop-saturate-150 hover:bg-background-light dark:hover:bg-background-dark outline-border-light dark:outline-border-dark hover:outline-accent-light dark:hover:outline-accent-dark hover:rounded-[0.075rem] hover:shadow-primary-light dark:hover:shadow-primary-dark text-secondary-light dark:text-secondary-dark transition-all ease-out duration-[400ms]">
            GIVE ME A CHUCKLE
        </button>
        <button
            onclick={typingArea.resetGame}
            class="w-fit font-[600] p-0.5 outline outline-[2px] bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-md drop-shadow-lg backdrop-saturate-150 hover:bg-background-light dark:hover:bg-background-dark outline-border-light dark:outline-border-dark hover:outline-accent-light dark:hover:outline-accent-dark hover:rounded-[0.075rem] hover:shadow-primary-light dark:hover:shadow-primary-dark text-secondary-light dark:text-secondary-dark transition-all ease-out duration-[400ms]">
            🔄️
    </button>
    </div>

    <p class="text-disabled-light dark:text-disabled-dark text-sm font-[600]">
        Made with love and care by <a href="https://github.com/djaruun" class="underline hover:text-unfocused-light dark:hover:text-unfocused-dark">DJARUUN</a>
    </p>
</div>  

<style>
    html.dark {
        color-scheme: dark;
    }
</style>