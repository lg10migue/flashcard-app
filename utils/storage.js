import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "flashcards";

// Save a flashcard to storage.
export const saveFlashcard = async (flashcard) => {
    try {
        const existingFlashcards = await AsyncStorage.getItem(STORAGE_KEY);
        const flashcards = existingFlashcards
            ? JSON.parse(existingFlashcards)
            : [];
        flashcards.push(flashcard);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
    } catch (error) {
        console.error("Error saving flashcard:", error);
    }
};

// Get all flashcards from storage.
export const getFlashcards = async () => {
    try {
        const flashcards = await AsyncStorage.getItem(STORAGE_KEY);
        return flashcards ? JSON.parse(flashcards) : [];
    } catch (error) {
        console.error("Error getting flashcards:", error);
        return [];
    }
};

// Remove a flashcard from storage.
export const removeFlashcard = async (flashcardId) => {
    try {
        const existingFlashcards = await AsyncStorage.getItem(STORAGE_KEY);
        const flashcards = existingFlashcards
            ? JSON.parse(existingFlashcards)
            : [];
        const updatedFlashcards = flashcards.filter(
            (flashcard) => flashcard.id !== flashcardId
        );
        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedFlashcards)
        );
    } catch (error) {
        console.error("Error removing flashcard:", error);
    }
};

// Update a flashcard set in storage.
export const updateFlashcard = async (flashcard) => {
    try {
        const existingFlashcards = await AsyncStorage.getItem(STORAGE_KEY);
        let flashcards = existingFlashcards
            ? JSON.parse(existingFlashcards)
            : [];
        const flashcardIndex = flashcards.findIndex(
            (flashcard) => flashcard.id === flashcard.id
        );
        if (flashcardIndex !== -1) {
            flashcards[flashcardIndex] = flashcard;
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
        }
    } catch (error) {
        console.error("Error updating flashcard:", error);
    }
};
