import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/loginpage.module.css'
import { Helmet } from 'react-helmet';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignUp } from "../services/UserAuth";
import { LoadingContext } from "../components/AuthComponent";
import { useContext } from "react";
import { LoadingContextType } from "../utils/BlogAppTypes";

const UserDetails=z.object({
  email: z.string().email(),
  password: z.string(),
  confirmpass: z.string().min(8),
  name: z.string().min(3)
})
.refine((data) => data.password === data.confirmpass, {
  message: "Password doesn't match",
  path: ["confirmpass"]
});


function SignupPage() {
  const {register,handleSubmit,formState,reset}=useForm({resolver: zodResolver(UserDetails)})
  const {errors}=formState
  const {handleLoading} = useContext(LoadingContext) as LoadingContextType
  const navigate=useNavigate()
  const handleSignup=async (formValues:Record<string,any>)=>{
    const data= {
      email: formValues.email,
      password: formValues.password,
      name: formValues.name
    }
    handleLoading(true)
    const {result,token,message,userId}=await userSignUp(data)
    handleLoading(false)
    if(result)
    {
      localStorage.setItem('jwtToken',token!)
      localStorage.setItem('userId',userId!)
      reset()
      navigate('/',{replace: true})
    }
    else
    alert(message)
  }
  return (
    <>
      <Helmet>
        <title>Blip | Signup</title>
      </Helmet>
      <form className={styles.loginform} onSubmit={handleSubmit(handleSignup)}>
        <h1>Create an account</h1>
        <label>Name</label>
        <input placeholder="Enter your name" {...register('name')}/>
        {errors.name && <p className={styles.error}>{errors.name.message?.toString()}</p>}
        <label>Email id</label>
        <input placeholder="Enter your email address" {...register('email')}/>
        {errors.email && <p className={styles.error}>{errors.email.message?.toString()}</p>}
        <label>Password</label>
        <input placeholder="Enter your password"  {...register('password')} type="password"/>
        {errors.password && <p className={styles.error}>{errors.password.message?.toString()}</p>}
        <label>Confirm Password</label>
        <input placeholder="Enter your password again" {...register('confirmpass')} type="password"/>
        {errors.confirmpass && <p className={styles.error}>{errors.confirmpass.message?.toString()}</p>}
        <button type="submit">Create account</button>
        <p className={styles.content}>Already have an account? <Link to='/login' className={styles.signuplink}>Signin</Link></p>
      </form>
    </>
  )
}

export default SignupPage

