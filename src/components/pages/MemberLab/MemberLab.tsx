// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/Redex/Store";
// import { fetchMembers } from "@/Redex/All Tables slice/MemberLab";





// export default function MemberLab() {
//   const membershipS = useSelector((state: RootState) => state.membership);
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(fetchMembers());
//   }, [dispatch]);


//   const [searchQuery, setSearchQuery] = useState("");



//   return (
//     <div>
//       <h1>Member Management</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Search members"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Membership Type</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* {membershipS.data?.result?.map((member:any) => (
//             <tr key={member.id}>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.phoneNumber || "N/A"}</td>
//               <td>{member.membershipType}</td>
//               <td>{member.createdAt.toLocaleDateString()}</td>
//             </tr>
//           ))} */}
//         </tbody>
//       </table>
//     </div>
//   );
// }



const MemberLab = () => {
  return (
    <div>MemberLab</div>
  )
}

export default MemberLab