import Image from "next/legacy/image";
import { fetchSellersList } from "./actions";

interface Profile {
  user_id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export default async function ProfilesWrapper() {
  const sellerList: [Profile] = await fetchSellersList();
  return (
    <>
      {sellerList?.map((profile) => {
        return <Profile key={profile.user_id} profile={profile} />;
      })}
    </>
  );
}

export function Profile({ profile }: { profile: Profile }) {
  const imageAlt = `Picture of ${profile.username}`;

  return (
    <section>
      <Image
        src={"/images/profile.jpg"}
        alt={imageAlt}
        height={400}
        width={200}
      />
      <h2>{profile.username}</h2>
    </section>
  );
}
