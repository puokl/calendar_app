import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./CalendarStyles";

const daysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const isWeekend = (day) => {
  return day === 5 || day === 6;
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = daysInMonth(year, month);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const firstDayOfMonth = new Date(year, month, 1).getDay() - 1;

  const numRows = Math.ceil((days + firstDayOfMonth) / 7);

  const daysArray = Array.from({ length: numRows * 7 }, (_, index) => {
    const day = index - firstDayOfMonth + 1;

    if (day <= 0) {
      const prevMonthDate = new Date(year, month, 0);
      const prevMonthDay =
        prevMonthDate.getDate() - (firstDayOfMonth - index) + 1;

      return {
        day: prevMonthDay,
        isPrevMonth: true,
      };
    } else if (day > days) {
      return {
        day: day - days,
        isNextMonth: true,
      };
    } else {
      return {
        day: day,
        isPrevMonth: false,
        isNextMonth: false,
      };
    }
  });

  useEffect(() => {
    console.log("daysArray:", daysArray);
    console.log("days:", days);
    console.log("firstDayOfMonth:", firstDayOfMonth);
    console.log("numRows:", numRows);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevMonth}>
          <Text style={styles.icon}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.month}>{`${year} - ${month + 1}`}</Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.icon}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map((day, index) => (
          <Text
            key={index}
            style={[
              styles.dayOfWeek,
              isWeekend(index) ? styles.weekendDay : null,
            ]}
          >
            {day}
          </Text>
        ))}
      </View>

      <FlatList
        data={daysArray}
        horizontal={false}
        numColumns={7}
        renderItem={({ item, index }) => (
          <Text
            key={index}
            style={[
              styles.calendarDay,
              isWeekend((firstDayOfMonth + (item.day || 0) - 1) % 7)
                ? styles.weekendDay
                : null,
              item.isPrevMonth
                ? styles.prevMonthDay
                : item.isNextMonth
                ? styles.nextMonthDay
                : null,
            ]}
          >
            {item.day}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Calendar;
