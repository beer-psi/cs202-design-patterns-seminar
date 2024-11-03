<template>
    <div class="slidev-layout better-two-cols-header">
        <div class="flex flex-col">
            <slot />

            <div class="grid grid-cols-2 gap-x-1">
                <div>
                    <slot name="left" />
                </div>

                <div>
                    <slot name="right" />
                </div>
            </div>
        </div>
    </div>
</template>
