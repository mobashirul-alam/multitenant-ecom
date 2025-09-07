import { RefObject } from "react";

export const useDropdownPosition = (
    ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
    const getDropdownPosition = () => {
        if (!ref.current) return { top: 0, left: 0 };

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // width of dropdown (w-60 - 15rem - 240px)

        // calculate the initial position
        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // check if the dropdown would overflow the viewport
        if (left + dropdownWidth > window.innerWidth) {
            // Align to the right edge of the button instead
            left = rect.right + window.scrollX - dropdownWidth;

            // if still overflows, align to the right edge with some padding
            if (left < 0) {
                left = window.innerWidth - dropdownWidth - 16;
            }
        }

        // ensure dropdown doesn't go off the left edge
        if (left < 0) {
            left = 16; // add some padding from the edge
        }

        return { top, left };
    };

    return { getDropdownPosition };
};
