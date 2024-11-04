import { defineMermaidSetup } from "@slidev/types";

export default defineMermaidSetup(() => ({
    theme: "dark",
    themeVariables: {
        fontFamily: "Nunito Sans",
        fontSize: "15px",
    },
    class: {
        hideEmptyMembersBox: true,
    },
}));
