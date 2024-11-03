<template>
    <div class="slidev-layout center-diagram">
        <slot />

        <div class="flex items-center justify-center mt-3 mb-4">
            <div><slot name="diagram" /></div>
        </div>

        <slot name="footer" />
    </div>
</template>
