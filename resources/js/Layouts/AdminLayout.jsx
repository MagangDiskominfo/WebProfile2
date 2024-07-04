import { Link, usePage } from '@inertiajs/react'
import React, { useState, useRef, useEffect } from 'react'

const AdminLayout = ({children}) => {
    const {component} = usePage()
    console.log(component);

    const [popoverOpen, setPopoverOpen] = useState(false);
    const popoverRef = useRef(null);

    const handleMouseEnter = () => {
        setPopoverOpen(true);
    };

    const handleMouseLeave = () => {
        setPopoverOpen(false);
    };

    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
            setPopoverOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <>
        <header className='bg-white shadow-[0px_2px_10px_#00000040] text-black py-8'>
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                <img src="/images/logo_diskominfo.png" alt="Logo" className="h-10" />
                    <nav className='flex justify-between items-center ml-32 mr-20'>
                        <div className='flex gap-6 items-center justify-start'>
                            <Link 
                                href='/'
                                className={`${
                                    component == "Dashboard" 
                                        ? "font-semibold text-red-600" 
                                        : ""
                                }`}
                            
                            >
                                Dashboard
                            </Link>
                            <div 
                                    className='relative'
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    ref={popoverRef}
                                >
                                    <button 
                                        className={`flex items-center ${
                                            component == "Tentang" || component == "VisiMisi"
                                                ? "font-semibold text-red-600" 
                                                : ""
                                        }`}
                                    >
                                        Tentang
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {popoverOpen && (
                                        <div 
                                            className='absolute -left-6 mt-0 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-300'
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <Link 
                                                href='/tentang'
                                                className={`block px-4 py-2 text-black hover:bg-gray-200 ${
                                                    component == "Tentang" 
                                                        ? "font-semibold text-red-600" 
                                                        : ""
                                                }`}
                                            >
                                                Visi & Misi
                                            </Link>
                                        </div>
                                    )}
                                </div>
                        </div>

                        {/* <div>
                            User
                        </div> */}
                    </nav>
                </div>
            </div>
        </header>
        <main className='mt-5'>
            <div className="container mx-auto">
                {children}
            </div>
        </main>

    </>
  )
}

export default AdminLayout