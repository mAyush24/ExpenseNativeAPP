import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello World!!</Text>
    </View>
  );
}
