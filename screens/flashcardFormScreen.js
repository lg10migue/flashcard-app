import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { saveFlashcard, updateFlashcard } from "../utils/storage";

const FlashcardFormScreen = ({ navigation, route }) => {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (route.params?.flashcard) {
            const { title, question, answer } = route.params.flashcard;
            setTitle(title);
            setQuestion(question);
            setAnswer(answer);
            setIsEditing(true);
        }
    }, [route.params?.flashcard]);

    const handleSubmit = async () => {
        if (!question.trim() || !answer.trim() || !title.trim()) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        // Save the flashcard.
        const newFlashcard = {
            id: isEditing ? route.params.flashcard.id : Date.now().toString(),
            question,
            answer,
            title,
        };

        if (isEditing) {
            await updateFlashcard(newFlashcard);
            Alert.alert("Success", "Flashcard updated successfully!");
            navigation.navigate("FlashcardDetail", { flashcard: newFlashcard });
        } else {
            await saveFlashcard(newFlashcard);
            Alert.alert("Success", "Flashcard added successfully!");
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Question or Term"
                value={question}
                onChangeText={setQuestion}
            />
            <TextInput
                style={styles.input}
                placeholder="Answer or Definition"
                value={answer}
                onChangeText={setAnswer}
            />
            <Button
                title={isEditing ? "Update Card" : "Add Card"}
                onPress={handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
});

export default FlashcardFormScreen;
