<template>
    <div class="qrcode_container" ref="qrCodeRef"></div>
</template>

<script lang="ts" setup>
import QRCodeStyling, { Options } from "styled-qr-code";
import { watch, computed, onMounted, ref } from "vue";

const qrCodeRef: any = ref(null);

export interface Props {
    value: string,
    color: string,
    width: number,
    height: number,
    image: string,
}

const props = withDefaults(defineProps<Props>(), {
    width: 200,
    height: 200,
    color: "000000",
});

const options: Options = {
    width: props.width,
    height: props.height,
    type: "svg",
    data: props.value,
    image: props.image,
    margin: 10,
    qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "H",
    },
    imageOptions: {
        hideBackgroundDots: true,
        crossOrigin: "anonymous",
    },
    cornersSquareOptions: {
        type: "extra-rounded",
        color: props.color
    },
    cornersDotOptions: {
        type: "square",
        color: props.color
    },
    dotsOptions: {
        type: "rounded",
        color: props.color,
    },
};

const qrCode = new QRCodeStyling(options);

onMounted(async () => {
    qrCode.append(qrCodeRef.value);
});

watch(
    () => props.value,
    (newValue) => {
        qrCode.update({ ...options, data: newValue });
    },
);

</script>
