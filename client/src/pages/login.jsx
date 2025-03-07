import React, { useState } from "react";
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from 'axios';
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";

function login() {
    const router = useRouter();
    const [{ }, dispatch] = useStateProvider();
    const handleLogin = async () => {
    const provider = new GoogleAuthProvider()
  const { 
    user: { displayName: name, email, photoURL: profileImage },
        } = await signInWithPopup(firebaseAuth, provider);
  try {
      if (email) {
      // console.log('Sending request to:', CHECK_USER_ROUTE);
      const { data } = await axios.post(CHECK_USER_ROUTE, { email });
          // console.log({ data });
          if (!data.status) {
            dispatch({ type: reducerCase.SET_NEW_USER, newUser: true })
            dispatch({
              type: reducerCase.SET_USER_INFO, 
              userInfo: {
                name,
                email,
                profileImage,
                status: "",
              },
            })
            router.push("/onboarding");
          }
        }
      } catch (err) {
        console.log(err);
      }
      }
return (
      <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
        <div className="flex justify-center items-center gap-2 text-white">
          <Image src="/whatsapp.gif" alt="chatLH" height={300} width={300} />
          <span className="text-7xl">ChatLH</span>
        </div>
        <button className="flex justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={handleLogin}>
         <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login with Google</span>
        </button>
      </div>

)
}

export default login;