import Image from "next/image";
import React, { useState,useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";


function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const[grabPhoto,setGradPhoto] = useState(false);
  const[showPhotoLibrary, setShowPhotoLibrary]= useState(false);
  const[showCapturePhoto, setShowCapturePhoto]= useState(false);
  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  useEffect(()=>{
    if(grabPhoto){
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus =(e)=>{
        setTimeout(()=>{
        setGradPhoto(false);
        },1000)
        
      };
    }
  },[grabPhoto])


  const contextMenuOptions = [
    { name: "Take photo", callback:() =>{
        setShowCapturePhoto(true);
    } },
    { name: "Choose from library", callback:() =>{
        setShowPhotoLibrary(true);
    } },
    { name: "Upload photo", callback:() =>{
        setGradPhoto(true);
    } },
    { name: "Remove photo", 
      callback:() =>{
        setImage("/default_avatar.png")
      } },
  ];
  // const PhotoPickerChange =async (e) => {
  //   console.log(e);
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   console.log({file});
  //   const data = document.createElement("img");
  //   reader.onload =function (event) {
  //     data.src =event.target.result;
  //     data.setAttribute("data-src",data.target.result);
  //   };
  //   reader.readAsDataURL(file);
  //   setTimeout(()=>{

  //     console.log(data.src)
  //     setImage(data.src);
  //   },100);
  // };


  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
                 ${hover ? "visible" : "hidden"
              }`}
              onClick={(e) => showContextMenu(e)}
              id="context-opener"
            >
              <FaCamera
                className="text-2xl"
                id="context-opener"
                onClick={(e) => showContextMenu(e)}
              />
              <span onClick={(e) => showContextMenu(e)}> <br />Change profile photo </span>
            </div>
            <div className="flex items-center justify-center h-60 w-60">
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
      </div>
      {
        isContextMenuVisible && (
          <ContextMenu
            options={contextMenuOptions}
            coordinates={contextMenuCordinates}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
          />
        )
      }

      {showCapturePhoto && <CapturePhoto 
      setImage ={setImage} 
      hide={setShowCapturePhoto}
      />}
      {showPhotoLibrary && (
        <PhotoLibrary 
          setImage={setImage} 
          hidePhotoLibrary ={setShowPhotoLibrary}/>)}
      { grabPhoto && <PhotoPicker onChange= {photoPickerChange}/>}
    </>
  );
}

export default Avatar;
