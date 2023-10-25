import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
    color: "blue",
  },
  month: {
    fontSize: 18,
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  dayOfWeek: {
    width: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  calendarArea: {
    width: 260,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyDay: {
    width: 30,
    height: 30,
  },
  calendarDay: {
    width: 40,
    height: 30,
    textAlign: "center",
    marginVertical: 5,
  },
  weekendDay: {
    color: "red",
  },
  prevMonthDay: {
    color: "gray",
  },
  nextMonthDay: {
    color: "gray",
  },
});
