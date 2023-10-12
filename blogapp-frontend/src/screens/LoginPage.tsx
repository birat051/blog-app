import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/loginpage.module.css'
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSignIn } from "../services/UserAuth";
import { LoadingContext } from "../components/AuthComponent";
import { useContext } from "react";
import { LoadingContextType } from "../utils/BlogAppTypes";

const UserDetails=z.object({
  email: z.string().email(),
  password: z.string()
})

function LoginPage() {
  const {handleLoading} = useContext(LoadingContext) as LoadingContextType
  const {register,handleSubmit,formState,reset}=useForm({resolver: zodResolver(UserDetails)})
  const {errors}=formState
  const navigate=useNavigate()
  const login=async (formValues:Record<string,any>)=>{
    handleLoading(true)
    const {result,token,userId,message} = await userSignIn({email: formValues.email,password: formValues.password})
    handleLoading(false)
    if(!result)
    alert(message)
    else
    {
      localStorage.setItem('jwtToken',token!)
      localStorage.setItem('userId',userId!)
      reset()
      navigate('/',{replace: true})
    }
  }
  return (
    <>
      <Helmet>
        <title>Blip | Login</title>
      </Helmet>
      <form className={styles.loginform} onSubmit={handleSubmit(login)}>
        <h1>Login</h1>
        <label>Email id</label>
        <input placeholder="Enter your email address" {...register('email')}/>
        {errors.email && <p className={styles.error}>{errors.email.message?.toString()}</p>}
        <label>Password</label>
        <input placeholder="Enter your password" {...register('password')} type="password"/>
        <button type="submit">Login</button>
        <p className={styles.content}>Don't have an account? <Link to='/signup' className={styles.signuplink}>Signup</Link></p>
      </form>
    </>
  )
}

export default LoginPage
