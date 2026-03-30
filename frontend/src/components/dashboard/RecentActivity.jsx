import React from "react";

const activities = [
  { id: 1, text: "Invoice INV-102 created", time: "2 hours ago" },
  { id: 2, text: "New client added", time: "5 hours ago" },
  { id: 3, text: "Payment received ₹45,000", time: "Yesterday" },
  { id: 4, text: "Project updated", time: "2 days ago" },
];

const RecentActivity = () => (
  <div className="bg-white p-6 rounded-2xl border shadow-sm">
    <h3 className="font-semibold mb-4">Recent Activity</h3>

    <ul className="space-y-3 max-h-64 overflow-y-auto">
      {activities.map((a) => (
        <li
          key={a.id}
          className="flex justify-between text-sm border-b pb-2"
        >
          <span className="text-gray-700">{a.text}</span>
          <span className="text-gray-400">{a.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivity;
