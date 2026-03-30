// import {
//   FileText,
//   Users,
//   Briefcase,
//   Layers
// } from "lucide-react";

// const icons = {
//   Invoice: <FileText size={28} />,
//   candidates: <Users size={28} />,
//   clients: <Briefcase size={28} />,
//   projects: <Layers size={28} />,
// };

// export default function StatCard({ title, value, type }) {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>
//           <p className="text-3xl font-bold mt-2">{value}</p>
//         </div>

//         <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
//           {icons[type]}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const StatCard = ({ title, value, icon, bg = "bg-indigo-50", iconColor = "text-indigo-600" }) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-700">{title}</p>
          <p className="text-3xl font-bold mt-1 text-gray-900">
            {value ?? "--"}
          </p>
        </div>

        <div className={`p-3 rounded-full ${bg} ${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

