import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import {
    StyleSheet,
    View,
    FlatList,
    Keyboard,
    Alert,
    TouchableWithoutFeedback,
} from "react-native";
import Header from "./components/Header";
import Persons from "./components/Persons";
import AddPerson from "./components/AddPerson";
// import Playground from "./components/playground";

const getFonts = () => {
    return Font.loadAsync({
        yekan: require("./assets/fonts/IranNastaliq.ttf"),

    });
};

const App = () => {
    const [persons, setPersons] = useState([
        { name: "حسین اسدی", key: "1", completed: false },
        { name: "ایمان مدائنی", key: "2", completed: false },
        { name: "سجاد باقرزاده", key: "3", completed: false },
        { name: "محمد اردوخانی", key: "4", completed: false },
    ]);

    const [person, setPerson] = useState("");
    const [fontLoading, setFontLoading] = useState(false);

    const pressHandler = (key) => {
        setPersons((prevPersons) => prevPersons.filter((p) => p.key != key));
    };

    const completedHandler = (key) => {
        const allPersons = [...persons];
        const personIndex = allPersons.findIndex((p) => p.key == key);
        const person = allPersons[personIndex];
        person.completed = !person.completed;
        allPersons[personIndex] = person;

        setPerson(allPersons);
    };
    const submitHandler = () => {
        if (person.length > 3) {
            setPersons((prevPersons) => [
                ...prevPersons,
                {
                    name: person,
                    key: Math.floor(Math.random() * 1000).toString(),
                    completed: false,
                },
            ]);
            setPerson("");
            Keyboard.dismiss();
        } else {
            Alert.alert("منو ببین!!!", "اسم نباید کمتر از 3 کاراکتر باشد", [
                { text: "فهمیدم", onPress: () => console.log("Alert closed") },
            ]);
        }
    };

    if (fontLoading) {
        return (
            // <Playground />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* Header */}
                    <Header />
                    <View style={styles.body}>
                        {/* Add Person */}
                        <AddPerson
                            submitHandler={submitHandler}
                            setPerson={setPerson}
                            person={person}
                        />
                        <View style={styles.items}>
                            <FlatList
                                data={persons}
                                renderItem={({ item }) => (
                                    <Persons
                                        person={item}
                                        pressHandler={pressHandler}
                                        completedHandler={completedHandler}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontLoading(true)}
            />
        );
    }
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    body: {
        padding: 40,
        flex: 1,
    },
    items: {
        marginTop: 20,
        flex: 1,
    },
});
