'use client'
import { useAuth } from '@/context/authContext';
const Header = () => {
    const { user } = useAuth();

    return(
        <header className="w-100">
            <nav className="flex gap-4 p-4 border-b">
                <a href="/">Home</a>
                {user ?(
                    <>
                    <a href="/profile">Profile</a>
                    </>
                ) : (
                    <>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                    </>
                )
                }
                <a href="/blogs">Blogs</a>
            </nav>
        </header>
    )
}

export default Header;