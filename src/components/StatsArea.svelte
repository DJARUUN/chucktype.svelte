<script lang="ts">
    let {
        userInput,
        jokeText,
        elapsedTime,
    } = $props<{
        userInput: string,
        jokeText: string,
        elapsedTime: number,
    }>()

    // Goes trough all letters and adds wrong letters to mistakeCount
    let mistakeCount = $derived.by(() => {
        let count = 0

        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] !== jokeText[i]) {
                count++
            }
        }
	    let ratio = 100 - (count / userInput.length * 100)

	    // Returns zero if calc gives NaN
	    return ratio >= 0 ? { count: count, ratio: ratio } : { count: 0, ratio: 0 }
    })

    // Counts amount of typed words and returns calulated wpm
    let wpm = $derived.by(() => {
        const wordCount = userInput.split(" ").length
        const wordsPerMinute = (wordCount / elapsedTime) * 60

        // Returns 0 if calc gives Infinity
        return wordsPerMinute !== Infinity ? wordsPerMinute : 0
    })
    ;
</script>

<div class="text-sm font-[600] text-foreground-light dark:text-foreground-dark text-center flex flex-col gap-1">
    <p>
        <span class="text-unfocused-light dark:text-unfocused-dark">Mistakes:</span> <span class="text-secondary-light dark:text-secondary-dark">{mistakeCount.count}</span> <span class="text-disabled-light dark:text-disabled-dark">⋅</span>
        <span class="text-unfocused-light dark:text-unfocused-dark">Accuracy:</span> <span class="text-secondary-light dark:text-secondary-dark">{mistakeCount.ratio.toFixed(1)}%</span>
    </p>
    <p>
        <span class="text-unfocused-light dark:text-unfocused-dark">Time:</span> <span class="text-secondary-light dark:text-secondary-dark">{elapsedTime.toFixed(2)}s</span> <span class="text-disabled-light dark:text-disabled-dark">⋅</span>
        <span class="text-unfocused-light dark:text-unfocused-dark">WPM:</span> <span class="text-secondary-light dark:text-secondary-dark">{wpm.toFixed(1)}</span>
    </p>
</div>