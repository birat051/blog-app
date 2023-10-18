import { useEffect, useState } from "react"
import { uploadBlogImage } from "../services/Blogs"
import useLocalStorage from "./useLocalStorage"

function useImage(initialValue:string):[image:File | null,blogImageUrl: string,(e: React.ChangeEvent<HTMLInputElement>)=>void,()=> void ] {
    const [image, setimage] = useState<File | null>(null)
    const [blogImageUrl, setblogImageUrl] = useState(initialValue)
    const [jwt,userId]=useLocalStorage()
    const changePreviewImage=(event: React.ChangeEvent<HTMLInputElement>)=>{
        event.preventDefault()
        const file = event.target.files?.[0];
        if (file) {
            setimage(file);
        }
    }
    const removePreviewImage=()=>{
        setblogImageUrl('')
        setimage(null)
    }
    useEffect(() => {
        async function uploadImage(userId:string,jwt:string)
        {
            const {result,message,imageUrl} = await uploadBlogImage(userId,jwt,image!)
            if(!result)
            alert(message)
            else
            setblogImageUrl(imageUrl!)
        }
        if(image)
        {
            uploadImage(userId!,jwt!)
        }
    }, [image])
  return [image,blogImageUrl,changePreviewImage,removePreviewImage]
}

export default useImage
