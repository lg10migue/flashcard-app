import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { removeFlashcard } from "../utils/storage";

const FlashcardDetailScreen = ({ navigation, route }) => {
    const { flashcard } = route.params;
    const [showAnswer, setShowAnswer] = useState(false);

    const handleEdit = () => {
        navigation.navigate("FlashcardForm", { flashcard });
    };

    const handleDelete = async () => {
        await removeFlashcard(flashcard.id);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => setShowAnswer(!showAnswer)}
            >
                <Text style={styles.cardContent}>
                    {showAnswer ? flashcard.answer : flashcard.question}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDelete}
            >
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        width: "100%",
        minHeight: 200,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        elevation: 3,
    },
    cardContent: {
        fontSize: 24,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: "80%",
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#DC3545",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default FlashcardDetailScreen;
