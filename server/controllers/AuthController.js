import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser =async (req,res,next) =>{
    console.log('checkUser function called');
    try{
        const { email } =req.body;
        if(!email){
            return res.json({msg:"Email is required.",status:false});
        }
        const prisma =getPrismaInstance();
        const user =await prisma.user.findUnique({where : { email}});
        if(!user){
            return res.json({msg: "User not found",status: false});
        }else{
            return res.json({msg:"User Found",status : true,data:user});
        }
    }catch(err){
        next(err);
    }
};
// export const onBoardUser =async (req,res,next) =>{
//     try {
//         const {email, name, about, image: profilePicture} = req.body;
//         if(!email || !name || !profilePicture){
//             return res.send("Email, Name and Image are required.");
//         }
//         const prisma =getPrismaInstance();
//         await prisma.user.creat({
//             data:{ email, name,about, profilePicture},
//         });
//         return res.json({msg:"success", status :true});
//     } catch (error) {
        
//     }
// }
export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;
    if (!email || !name || !profilePicture) {
      return res.send("Email, Name and Image are required.");
    }
    const prisma = getPrismaInstance();
    await prisma.user.create({
      data: { email, name, about, profilePicture },
    });
    return res.json({ msg: "success", status: true });
  } catch (err) {
    next(err);
  }
}