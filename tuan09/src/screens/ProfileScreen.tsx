import { Text } from "react-native";

export default function ProfileScreen({route} : {route: any}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}