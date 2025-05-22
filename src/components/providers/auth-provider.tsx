import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
    useEffect(()=>{
        const url = new URLSearchParams(window.location.search);
        const token = url.get('token');
        // const profile = url.get('profile');
        
        if (token) {
            localStorage.setItem('token', token);
            // localStorage.setItem('profile', JSON.stringify(profile));
            router.push('/');
        }
    })
  return (
    children
  )
}

export default AuthProvider