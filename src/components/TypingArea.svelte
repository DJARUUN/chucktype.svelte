<script lang="ts">
	import StatsArea from "./StatsArea.svelte"

    // Joke and user input states
    let placeholder = "Chuck Norris jokes ahead, be prepared."
    let jokeText = $state(placeholder)
    let userInput = $state("")

    // General vars
    let isInputAreaDisabled = $state(true)
    let countdownCurrent = $state(0)
    let countdownFrom = 5
    let countdownInterval: number
    let hasCountdownStarted = $state(false)
    let elapsedTime = $state(0)
    let timerInterval: number
    
    // DOM references
    let inputArea: HTMLTextAreaElement | undefined = $state()

    // Creates an array of all letters and their states and styles with tailwind and data-state attribute
    let letterStates = $derived.by(() => {
        interface State {
            state: string
            style: string
        }
        let states: State[] = []

        jokeText.split("").map((letter, index) => {
            const userInputLetter = userInput[index]
            
            if (userInputLetter !== undefined) {
                if (userInputLetter === letter) { 
                    states.push({state: "correct", style: "text-secondary-light dark:text-secondary-dark"}) 
                }
                else { 
                    states.push({state: "incorrect", style: "bg-accent-light dark:bg-accent-dark text-foreground-light dark:text-foreground-dark"}) 
                }
            } 
            else { 
                states.push({state: "undefined", style: "text-unfocused-light dark:text-unfocused-dark"}) 
            }
        })
        return states
    })


    async function startCountdown() {
        // if (countdownCurrent === 0) {
            resetGame()

            console.log("Started countdown")
            jokeText = await fetchJoke()
            
            // Starts countdown and starts game after
            hasCountdownStarted = true
            countdownInterval = setInterval(() => {
                countdownCurrent--
                if (countdownCurrent === 0) {
                    clearInterval(countdownInterval)
                    startGame()
                }
            }, 1000)
        // }
    }

    function startGame() {
        console.log("Started game")
        isInputAreaDisabled = false

        // Needs to wait just a split second for input to be enabled
        setTimeout(() => { inputArea?.focus() }, 1)

        // Starts counting elapsed time
        timerInterval = setInterval(() => {
            elapsedTime += 0.01

            // Lengths are matching => user has finished typing
            if (userInput.length === jokeText.length) {
                finishGame()
            }
        }, 10)

    }

    function finishGame() {
        console.log("Finished game")
        clearInterval(timerInterval)
        inputArea?.blur()
    }

    function resetGame() {
        console.log("Reset game")
        clearInterval(timerInterval)
        clearInterval(countdownInterval)
        hasCountdownStarted = false
        isInputAreaDisabled = true
        jokeText = placeholder
        elapsedTime = 0
        userInput = ""
        countdownCurrent = countdownFrom
    }

    async function fetchJoke() {
        try {
            const response = await fetch("https://api.chucknorris.io/jokes/random")
            const { value } = await response.json()
            console.log(`Fetched joke: ${value}`)
            return value
        }
        catch (error) { throw error }
    }

    export { startCountdown, resetGame }
    ;
</script>

<!-- Container -->
<div class="flex flex-col items-center gap-4 w-6/12 mt-8 z-50 drop-shadow-lg">
    <!-- Text area -->
    <div
        class="{isInputAreaDisabled ? "border-border-light dark:border-border-dark" : "border-disabled-light dark:border-disabled-dark rounded-[0.075rem]"} relative border-2 px-6 py-3 bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-md backdrop-saturate-150">

        <!-- Countdown text -->
        {#if countdownCurrent > 0 && hasCountdownStarted}
            <p class="text-secondary-light dark:text-secondary-dark">
                &gt; Game starts in {countdownCurrent}
            </p>
        {/if}

        <!-- Joke text area -->
        <p
            class="select-none">
            {#each letterStates as letter, index}
                <span
                    class={isInputAreaDisabled ? "text-disabled-light dark:text-disabled-dark" : letter.style}
                    data-state={letter.state}>
                    {jokeText[index]}
                </span>
            {/each}
        </p>

        <!-- Invisible typing area -->
        <textarea
            bind:value={userInput}
            bind:this={inputArea}
            spellcheck="false"
            disabled={isInputAreaDisabled}
            style="width: calc(100% - 3.02rem); height: calc(100% - 1.5rem);"
            class="{isInputAreaDisabled ? "cursor-not-allowed" : "cursor-auto"} absolute top-[0.75rem] bg-transparent text-transparent outline-none resize-none caret-unfocused-light dark:caret-unfocused-dark overflow-hidden">
        </textarea>

    </div>

    <!-- Stats area -->
    <StatsArea 
        userInput={userInput}
        jokeText={jokeText}
        elapsedTime={elapsedTime}
    />
</div>
