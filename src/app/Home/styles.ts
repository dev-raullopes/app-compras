import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0D2D8",
    alignItems: "center",
    paddingTop: 62
  },
  logo: {
    width: 134,
    height: 34,
  },
  form: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 40,
    gap: 7
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    marginTop: 24,
  },
  header: {
    backgroundColor: "#b2b2b2",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D0D2D8",
    paddingBottom: 12,
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText: {
    color: "#828282",
    fontWeight: "600",
    fontSize: 14,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#EEF0F5",
    marginVertical: 16
  },
  listContent:{
    paddingTop: 24,
    paddingBottom: 62,
  }
});
