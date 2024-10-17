import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const MapComponent = dynamic(() => import('./components/Map.js'), { ssr: false });

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
        router.push('/login');
      }
    });
  }, []);

  return (
    <Wrapper>
      <MapComponent />
      <ActionItems>
        <Header>
          <UberLogo src="https://entrackr.com/storage/2018/05/UPI-2.jpg"/>
          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photoUrl} onClick={() => signOut(auth)} />
          </Profile>
        </Header>
        <ActionButtons>
          <Link href="/search">
            <ActionButton>
              <ActionButtonImage src="https://cdn.vectorstock.com/i/1000v/40/98/cash-money-in-hand-for-logo-design-on-white-vector-29954098.avif" />
              Need cash??
            </ActionButton>
          </Link>
          <ActionButton>
            <ActionButtonImage src="https://nimbbl.biz/blog/wp-content/uploads/2022/04/5-Common-Online-Payment-Problems-and-How-to-Solve-Them.jpeg" />
            Pay Online
          </ActionButton>
          <ActionButton>
            <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
            Feature
          </ActionButton>
        </ActionButtons>
        <InputButton>Where to</InputButton>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
  flex flex-col h-screen
`;

const ActionItems = tw.div`
  flex-1 p-4
`;

const Header = tw.div`
  flex justify-between items-center
`;

const UberLogo = tw.img`
  h-28
`;

const Profile = tw.div`
  flex items-center
`;

const Name = tw.div`
  mr-4 w-20 text-sm
`;

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px object-cover cursor-pointer
`;

const ActionButtons = tw.div`
  flex
`;

const ActionButton = tw.div`
  flex flex-col flex-1 bg-gray-200 m-1 h-32 items-center justify-center rounded-lg transform hover:scale-105 transition text-xl
`;

const ActionButtonImage = tw.img`
  h-3/5
`;

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`;
