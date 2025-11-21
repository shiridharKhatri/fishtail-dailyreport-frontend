// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Protected({ children }) {
//   const { verification } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     console.log(verification)
//     if (!verification) {
//       router.push("/");
//     }else{
//       router.push(verification.redirect)
//     }
//   }, []);

//   if (!verification) {
//     return <div>Loading...</div>;
//   }

//   return children;
// }
