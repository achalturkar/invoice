// import React, { useState } from "react";
// import { resolveCompanyImage } from "../../../utils/imageShow";

// const CompanyImages = ({ companyId, logoPath, stampPath, signPath }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <ImageCard
//         label="Company Logo"
//         companyId={companyId}
//         type="logo"
//         path={logoPath}
//       />

//       <ImageCard
//         label="Company Stamp"
//         companyId={companyId}
//         type="stamp"
//         path={stampPath}
//       />

//       <ImageCard
//         label="Authorized Signature"
//         companyId={companyId}
//         type="sign"
//         path={signPath}
//       />
//     </div>
//   );
// };

// export default CompanyImages;

// /* ================= SINGLE IMAGE CARD ================= */

// const ImageCard = ({ label, companyId, type, path }) => {
//   const [error, setError] = useState(false);

//   const imageUrl = path
//     ? resolveCompanyImage(companyId, type)
//     : null;

//   return (
//     <div className="border rounded-xl p-4 bg-gray-50 shadow-sm">
//       <p className="text-xs text-gray-500 mb-2 text-center">
//         {label}
//       </p>

//       <div className="h-36 w-full flex items-center justify-center bg-white border rounded-lg">
//         {!imageUrl || error ? (
//           <span className="text-xs text-gray-400">
//             No image uploaded
//           </span>
//         ) : (
//           <img
//             src={imageUrl}
//             alt={label}
//             className="max-h-full max-w-full object-contain"
//             onError={() => setError(true)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
