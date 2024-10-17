import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase';
import tw from 'tailwind-styled-components/dist/tailwind';

function Login() {

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push('/');
            };
        });
    }, []);

    return (
        <Wrapper>
            <UberLogo src='https://media.licdn.com/dms/image/v2/D4D12AQHnb3MZN2O0tA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1678430939336?e=1734566400&v=beta&t=8Q3OwBBwkTZdeOlYsET1eZHS6erW83tm5f0IRQOih_Q' />
            <Title>Login to access your account</Title>
            <HeadImage src='https://entrackr.com/storage/2018/05/UPI-2.jpg' />
            <SignInButton onClick={() => signInWithPopup(auth, provider)}>Sign in with Google</SignInButton>
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full
`

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`
const Title = tw.div`
    text-5xl pt-4 text-gray-500
`

const HeadImage = tw.img`
    object-contain w-full
`