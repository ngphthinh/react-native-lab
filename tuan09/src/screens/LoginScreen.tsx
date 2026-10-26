import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { RootStackParamList } from "../types";


interface UserRes {
    accessToken: string,
    user: {
        email: "string",
        id: number
    }
}
export default function LoginScreen () {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async () => {
        try {
        const res = await axios.post<UserRes>(
            "http://localhost:3000/login",
            user
        );

        const data = res.data;

        if (data.accessToken) {
            navigation.navigate("Home");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Alert.alert(
                "Login failed",
                error.response?.data?.message ?? error.message
            );
        } else {
            Alert.alert("Error", "Something went wrong");
        }
    }

    }

    return <View>
            <TextInput placeholder="Enter email" value={user.email} onChangeText={(e)=> setUser(prev => ({... prev, email: e}))}></TextInput>
            <TextInput placeholder="Enter password" value={user.password} onChangeText={(e)=> setUser(prev => ({... prev, password: e}))}></TextInput>
            <Button title="Login" onPress={handleLogin}></Button>
    </View>
}
