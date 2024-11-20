import React, { useState,useEffect } from "react";
import Image from 'next/image';
import { useStateProvider } from "@/context/StateContext";
import Avatar from "@/components/common/Avatar";
import axios from "axios";
// import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
// import { useRouter } from "next/router";


function Onboarding() {
  // const router = useRouter()
  const [{ userInfo }] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("/default_avatar.png");

//   useEffect(()=>{
//     if(!newUser && !userInfo?.email) router.push("/login");
//     else if(!newUser && userInfo?.email) router.push("/");
//     },[newUser,userInfo,router]);
//   const onboardUserHandler = async() =>{
//     if (validateDetails()){ 
//       const email =userInfo.email;
//       try{
//           const {data} = await axios.post(ONBOARD_USER_ROUTE, {
//               email,
//               name,
//               about,
//               image,
//           });
//         if(data.status){
//             dispatch({ type: reducerCase.SET_NEW_USER, newUser: false })
//             dispatch({
//             type: reducerCase.SET_USER_INFO, userInfo: {
//             name,
//             email,
//             profileImage: image,
//             status:about,
//             },
//             });
//             router.push("/");
//             }
//     }  catch(err){
//         console.log(err);
//       }
//     }
//   };
//   const validateDetails = () =>{
//     if( name.length<3){
//   return false;
// }
// return true;
// }
return (
  <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center gap-8">
  <div className="flex items-center justify-center gap-4">
  <Image src="/whatsapp.gif" alt="ChatLH" height={100} width={100} />
  <span className="text-5xl">ChatLH</span>
  </div>
  <h2 className="text-2xl mb-4">Create your profile</h2>
  {/* // Linh" change :move avatar tu div dươi len tren disname va about */}
  <div>
  <Avatar type="xl" image={image} setImage={setImage}/>
  </div>
  <div className="flex flex-col items-center gap-4 w-1/4 md:w-1/2 lg:w-1/3">
  <div className="flex flex-col items-start w-full">
  <label className="mb-1 text-gray-400">Display Name</label>
  <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="bg-input-background text-start focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
  />
  </div>
  <div className="flex flex-col items-start w-full">
  <label className="mb-1 text-gray-400">About</label>
  <input
  type="text"
  value={about}
  onChange={(e) => setAbout(e.target.value)}
  className="bg-input-background text-start focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
  />
  </div>
  <div className=" flex items-center justify-center">
  <button className=" flex justify-center gap-7 bg-search-input-container-background p-5 rounded-lg " >Create Profile </button>
  </div>
    </div>
  </div>
  );
}
export default Onboarding;