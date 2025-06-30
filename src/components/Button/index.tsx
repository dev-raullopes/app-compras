import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};
export function ButtonApp({ title, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest} style={styles.container} activeOpacity={0.7}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#2C46B1",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
