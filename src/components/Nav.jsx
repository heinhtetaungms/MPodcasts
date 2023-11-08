import authStore from '../zustand/authStore'
import ThemeSwitcher from './ThemeSwitcher';

const Nav = () => {
    const [authFirstname] = authStore((state)=>[state.firstName]);
    const [authLastname] = authStore((state)=>[state.lastName]);
    const [authProfileImage] = authStore((state)=>[state.profileImageUrl]);
    const [authProfileToggle] = authStore((state)=>[state.profileToggle]);
    const userName = authFirstname+' '+authLastname;
    const store = authStore.getState();

    const toggleProfileOverlay = ()=>{
        console.log("current toggle profile after click",!authProfileToggle)
        store.setToggleProfile(!authProfileToggle);
    }

  return (
    <>
        <nav style={{ transitionDelay: "30ms" }} className='dark:bg-dark border-b-1 border-gray bg-[#fafbfc]
        shadow-md dark:shadow-lg duration-200 relative dark:bg-cardDark dark:text-white dark:border-[#475355] dark:border-borderDark'>
            <div className='navbar flex justify-end items-center h-[80px] px-6 max-w-[1600px] mx-auto w-full'>
                <div className='mr-5'>
                    <ThemeSwitcher/>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='w-12 h-12 rounded-full bg-secondary overflow-hidden flex justify-center items-center mr-3' onClick={toggleProfileOverlay}>
                        <img src={authProfileImage}
                             style={{ width: "50px", height: "50px", borderRadius: "100%" }}
                             alt={authFirstname}/>
                    </div>
                    <div className='flex items-start justify-center flex-col'>
                        <p className='dark:text-textLight leading-none'>{userName}</p>
                        <span className='dark:text-textLight text-xs'>free user</span>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Nav