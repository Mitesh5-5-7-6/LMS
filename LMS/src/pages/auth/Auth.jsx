//Images
import SchooleImage from '../../assets/images/SchoolImage.jpeg';
import WelcomeImage from '../../assets/images/WelcomeImage.png';
import SchoolLogo from '../../assets/images/SchoolLogo.png';

//components
import SignupForm from '../../components/auth/SignupForm';

const Auth = () => {
    return (
        <div className='flex w-full h-screen bg-[var(--color-1)] fixed'>
            <div
                className="w-1/2 h-screen bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${WelcomeImage})` }}
            >
                <div className='flex w-1/2 pt-5 pl-5 fixed flex items-center'>
                    <img src={SchoolLogo} alt="Logo" className='w-[40px]' />
                </div>

                <SignupForm />

            </div>
            <div className='w-1/2'>
                <img src={SchooleImage} alt="Welcome Image" className='w-full h-screen' />
            </div>
        </div >
    )
}

export default Auth
