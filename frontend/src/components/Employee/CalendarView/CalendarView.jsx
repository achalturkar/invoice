import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export function CalendarView({ leaveData }) {

  const events = leaveData.map((leave) => ({
    title: leave.leaveTypeName,
    start: leave.fromDate,
    end: leave.toDate,
    color: leave.status === "APPROVED" ? "#22c55e" : "#f59e0b"
  }));

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
      />
    </div>
  );
}
