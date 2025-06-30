import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function InputApp({ ...rest }: TextInputProps) {
  return (
    <TextInput
      {...rest}
      style={styles.container}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFFF",
    borderWidth: 1,
    borderColor: "#C3C5CB",
  },
});
