import Image from "next/legacy/image";
import { fetchSellerInfo } from "./actions";

interface Profile{
    user_id: number,
    username: string,
    email: string,
    password: string,
    role: string
}

export default async function SellerInfo({user_id}: {user_id: string}){
    const profile: Profile = await fetchSellerInfo(user_id)
    const imageAlt = `Picture of ${profile.username}`
    
    return (
        <>
        <section>
            <h1> {profile.username} </h1>
            <p></p>
        </section>
        <Image
            src={'/images/profile.jpg'}
            alt={imageAlt}
            height={400}
            width={200} />
        </>
    )
}
