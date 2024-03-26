import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { getFlashcards } from "../utils/storage";

const MainScreen = ({ navigation }) => {
    const [flashcardsSets, setFlashcardsSets] = useState([]);

    useEffect(() => {
        const fetchFlashcards = async () => {
            const flashcards = await getFlashcards();
            setFlashcardsSets(flashcards);
        };

        fetchFlashcards();
    });

    // Render a single item in the list.
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                navigation.navigate("FlashcardDetail", { flashcard: item });
            }}
        >
            <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={flashcardsSets}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate("FlashcardForm");
                }}
            >
                <Text style={styles.buttonText}>Add new Flashcard</Text>
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
        marginVertical: 8,
        width: "100%",
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: "#000",
        shadowOffset: { height: 0, width: 0 },
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#f9c2ff",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default MainScreen;
