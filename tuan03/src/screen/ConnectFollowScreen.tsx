import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const ConnectFollowScreen = () => {

    const [isConnected, setIsConnected] = useState(false);
    const [message, setMessage] = useState('Chưa kết nối');
    const [snapshot, setSnapShot] = useState("");
    useEffect(() => {
        if (isConnected) {
            setMessage('Thiết bị đã kết nối');
            const now = new Date()
            setSnapShot(now.toISOString())
        } else {
            setMessage('Thiết bị đã ngắt kết nối');
        }
    }, [isConnected]);

    return <View>
        <Switch value={isConnected} onValueChange={setIsConnected} />
        <Text style={isConnected ? styles.connect : styles.disconnect} >{message}</Text>
       {snapshot && <Text>Thời gian kết nối gần nhất: {snapshot}</Text>}
    </View>

}

export default ConnectFollowScreen

const styles = StyleSheet.create({
    connect: {
        color: "green"
    },
    disconnect: {
        color: "red"
    }
})