<script lang="ts">
    function toggleTheme() {
        const classList = document.documentElement.classList
        classList.toggle("dark")

        if (classList.contains("dark")) {
            localStorage.setItem("theme", "dark")
        }
        else {
            localStorage.setItem("theme", "light")
        }
    }
    ;
</script>

<button
    onclick={toggleTheme}>
    toggle
</button>