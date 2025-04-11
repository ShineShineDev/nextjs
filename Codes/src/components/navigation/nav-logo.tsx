
import { HeartHandshakeIcon } from "lucide-react";
import Link from "next/link";

const  NavLogo = async () =>{
    
    return (
        <div>
           <Link href={'/'} className="text-3xl font-bold text-primary" ><HeartHandshakeIcon></HeartHandshakeIcon> </Link>
        </div>
    )
}

export default NavLogo;