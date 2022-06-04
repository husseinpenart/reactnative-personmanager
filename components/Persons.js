import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Persons = ({ person, pressHandler, completedHandler }) => {
    return (
        <TouchableOpacity onPress={() => completedHandler(person.key)}>
            <View style={styles.person}>
                <MaterialIcons
                    name="delete"
                    size={20}
                    color="coral"
                    onPress={() => pressHandler(person.key)}
                />
                <Text
                    style={[
                        styles.personName,
                        person.completed
                            ? { textDecorationLine: "line-through" }
                            : {},
                    ]}
                >
                    {person.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Persons;

const styles = StyleSheet.create({
    person: {
        padding: 20,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "orangered",
        borderRadius: 20,
        borderStyle: "dashed",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    personName: {
        textAlign: "center",
        fontSize: 17,
        // fontWeight: "bold",
        fontFamily: "yekan",
    },
});
