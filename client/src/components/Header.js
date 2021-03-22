// libraries:
import Link from 'next/link'
import {v4 as uuidv4} from 'uuid'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// layouts:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// components:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import routes from '../utils/routes'
import {authButtons, authHeaderKeys} from '../utils/buttons/auth'
import {generalButtons} from '../utils/buttons/general'

//==============================================================================


function Header() {
    return (
        <div
            className='bg-black-gradient'>
            <div className='container mx-auto md:p-2'>
                <div
                    className='flex justify-center items-center md:flex-row flex-wrap p-4'>
                    <img src='/logo.png'
                         className='w-1/4 opacity-90 lg:block hidden'/>
                    {
                        createRoutes()
                    }
                    <div className='
                    relative py-4 z-20 md:py-0
                    grid grid-cols-3 gap-2
                    '>
                        <Link href={authButtons.signup.href}>
                            <a className='button-pale-outline'>
                                {authButtons.signup.text}</a>
                        </Link>
                        <Link href={authButtons.signin.href}>
                            <a className='button-pale-outline'>
                                {authButtons.signin.text}</a>
                        </Link>
                        <Link href={generalButtons.cart.href}>
                            <button className='button-red'>
                                {generalButtons.cart.text}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


function createRoutes() {
    let listOfKeys = ['homepage', 'profile', 'store', 'faqs']
    return listOfKeys.map(function createLinks(value, index) {
            return (
                <div key={index} className='flex-1 text-center
                    transition duration-500 ease-in-out
                    transform hover:scale-110
                    '
                >
                    <Link href={routes[value]['route']}
                    >
                        <a className='
                        text-xl font-deco text-pale
                        border-2
                        px-4
                        py-2
                        rounded-md
                        transform
                        transition
                        ease-in-out
                        duration-200
                        border-transparent
                        hover:border-pale
                        hover:border-opacity-10
                        hover:shadow-md
                    '>
                            {routes[value]['title']}
                        </a>
                    </Link>
                </div>
            )
        }
    )
}


export default Header
