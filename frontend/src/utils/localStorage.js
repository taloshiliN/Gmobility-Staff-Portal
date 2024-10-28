// src/utils/localStorage.js
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("reduxState");
        if (serializedState === null) return undefined; // No saved state in localStorage
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Failed to load state from localStorage", e);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("reduxState", serializedState);
    } catch (e) {
        console.warn("Failed to save state to localStorage", e);
    }
};
