import { useContext } from "react";
import { Image, Text, View, StyleSheet, Button } from "react-native";
import { UserContext } from "../store/UserContext";

export default function ProfileScreen() {
     const context = useContext(UserContext);
     if (!context) {
        return <Text>Không tìm thấy Context Provider</Text>;
    }
     const { user, setUser } = context;
    if (!user) {
        return <Text style={styles.errorText}>Không tìm thấy thông tin người dùng</Text>;
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Xin chào, {user.name}</Text>
            <Text style={styles.infoText}>Email: {user.email}</Text>
            
            <Image 
                source={{ uri: user.imageUrl }} 
                style={styles.profileImage} 
            />
            <Button title="Đăng xuất" onPress={()=>setUser(null)}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    profileImage: {
        width: 150,     // Required for network images
        height: 150,    // Required for network images
        borderRadius: 75, // Optional: makes the image a perfect circle
        backgroundColor: '#e1e1e1' // Optional: placeholder color while loading
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        color: 'red',
    }
});
