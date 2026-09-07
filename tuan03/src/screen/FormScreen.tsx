import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

const FormScreen = () => {

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState("");


    const handleClear = () => {
        setAge("")
        setFullName("")
    }

    return <View>
        <View>
            <TextInput style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Nhập họ tên"
            />
            <Text>
                {fullName ? `Xin chào, ${fullName}!` : 'Vui lòng nhập họ tên'}
            </Text></View>

        <View>
            <TextInput style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Nhập tuổi"
            />
            <Text>
                {age ? `Tuổi của bạn là ${age}!` : 'Vui lòng nhập tuổi'}
            </Text >
            {parseInt(age) < 18 && <Text style={{ color: "#ff0000" }}>
                Bạn chưa 18 tuổi
            </Text>}
        </View>
        <Pressable onPress={handleClear} style={styles.btn}>
            <Text style={{ textAlign: "center", fontWeight: "600", color: "white" }}>Xóa</Text>
        </Pressable>

    </View>
}

export default FormScreen

const styles = StyleSheet.create({
    input: {
        borderColor: "#000",
        borderWidth: 1
    },
    btn: {
        backgroundColor: "#48ff00",
        borderRadius: 20,
        paddingHorizontal: 10
    }
})