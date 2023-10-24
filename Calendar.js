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
  //   const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const firstDayOfMonth = new Date(year, month, 1).getDay() - 1;

  const numRows = Math.ceil((days + firstDayOfMonth) / 7);

  //   const daysArray = Array.from({ length: numRows * 7 }, (_, index) => {
  //     const day = index - firstDayOfMonth + 1;
  //     return day > 0 && day <= days ? day : null;
  //   });

  const daysArray = Array.from({ length: numRows * 7 }, (_, index) => {
    const prevMonthDays = firstDayOfMonth; // Days from the previous month to display
    const currentMonthDays = days - prevMonthDays; // Days from the current month

    const day = index + 1;

    if (day <= prevMonthDays) {
      // Days from the previous month
      return {
        day: day,
        isPrevMonth: true,
      };
    } else if (day > prevMonthDays + currentMonthDays) {
      // Days from the next month
      return {
        day: day - (prevMonthDays + currentMonthDays),
        isNextMonth: true,
      };
    } else {
      // Days from the current month
      return {
        day: day - prevMonthDays,
        isPrevMonth: false,
        isNextMonth: false,
      };
    }
  });

  //   const daysArray = [];
  //   let dayCounter = 1;

  //   for (let row = 0; row < numRows; row++) {
  //     const rowDays = [];
  //     for (let col = 0; col < 7; col++) {
  //       if (row === 0 && col < firstDayOfMonth) {
  //         // Days from the previous month
  //         rowDays.push({
  //           day: null,
  //           isPrevMonth: true,
  //         });
  //       } else if (dayCounter <= days) {
  //         // Days from the current month
  //         rowDays.push({
  //           day: dayCounter,
  //           isPrevMonth: false,
  //           isNextMonth: false,
  //         });
  //         dayCounter++;
  //       } else {
  //         // Days from the next month
  //         rowDays.push({
  //           day: null,
  //           isNextMonth: true,
  //         });
  //       }
  //     }
  //     daysArray.push(rowDays);
  //   }

  useEffect(() => {
    console.log("daysArray:", daysArray);
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

      {/* <FlatList
        data={daysArray}
        horizontal={false}
        numColumns={7}
        renderItem={({ item }) => (
          <Text
            style={[
              styles.calendarDay,
              isWeekend((firstDayOfMonth + item - 1) % 7)
                ? styles.weekendDay
                : null,
            ]}
          >
            {item}
          </Text>
        )}
        keyExtractor={(item) => (item !== null ? item.toString() : "empty")}
      /> */}
      <FlatList
        data={daysArray}
        horizontal={false}
        numColumns={7}
        renderItem={({ item, index }) => (
          <Text
            key={index}
            style={[
              styles.calendarDay,
              isWeekend((firstDayOfMonth + item.day - 1) % 7)
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

    // <View style={calendarStyles.container}>
    //   <View style={calendarStyles.header}>
    //     <TouchableOpacity onPress={prevMonth}>
    //       <Text style={calendarStyles.icon}>{"<"}</Text>
    //     </TouchableOpacity>
    //     <Text style={calendarStyles.month}>{`${year} - ${month + 1}`}</Text>
    //     <TouchableOpacity onPress={nextMonth}>
    //       <Text style={calendarStyles.icon}>{">"}</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={calendarStyles.daysOfWeek}>
    //     {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
    //       <Text
    //         key={index}
    //         style={[
    //           calendarStyles.dayOfWeek,
    //           isWeekend(index) ? calendarStyles.weekendDay : null,
    //         ]}
    //       >
    //         {day}
    //       </Text>
    //     ))}
    //   </View>
    //   {/* <View style={calendarStyles.calendarArea}>
    //     {daysArray.map((day, index) => (
    //       <Text
    //         key={index}
    //         style={[
    //           day ? calendarStyles.calendarDay : calendarStyles.emptyDay,
    //           isWeekend((firstDayOfWeek + index) % 7)
    //             ? calendarStyles.weekendDay
    //             : null,
    //         ]}
    //       >
    //         {day || " "}
    //       </Text>
    //     ))}
    //   </View> */}
    //   <FlatList
    //     data={daysArray}
    //     numColumns={7} // Ensure a maximum of 7 items per row
    //     renderItem={({ item }) => (
    //       <Text
    //         style={[
    //           calendarStyles.calendarDay,
    //           isWeekend((firstDayOfWeek + item - 1) % 7)
    //             ? calendarStyles.weekendDay
    //             : null,
    //         ]}
    //       >
    //         {item}
    //       </Text>
    //     )}
    //     keyExtractor={(item) => item.toString()}
    //   />
    // </View>
  );
};

export default Calendar;
