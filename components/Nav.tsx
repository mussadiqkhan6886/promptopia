"use client"; 

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from "next-auth/react" 
import { BuiltInProviderType } from "@node_modules/next-auth/providers";
import Provider from "./Provider";

const Nav = () => {

  const {data: session} = useSession()

  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setProvidersFunc()
  }, [])

  const handleSignOut = () => {
    signOut({callbackUrl: "/"})
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href={"/"}>
        <Image src={"/assets/images/logo.svg"} alt="logo image of website, Promptopia " width={30} height={30} className="object-contain" />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={handleSignOut} className="outline_btn">Sign Out</button>

            <Link href={"/profile"}>
              <Image src={session?.user?.image ?? "/assets/images/default-avatar.png"} width={37} height={37} className="rounded-full " alt="profile image" />
            </Link>
          </div>
        ): (
          <>
            {providers && Object.values(providers).map(provider => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id, {
                prompt: "select_account",
                redirect: true,
                callbackUrl: "/"
              })} className="black_btn">
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user?.image ?? "/assets/images/default-avatar.png"} width={37} height={37} className="rounded-full" alt="profile" onClick={() => setToggleDropdown((prev) => !prev)} />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href={"/profile"} className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href={"/create-prompt"} className="dropdown_link" onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button type="button" onClick={() => { setToggleDropdown(false)
                  signOut()
                }} className="mt-5 w-full black_btn">
                  Sign Out
                </button>
              </div>
            )}

          </div>
        ): (
          <>
            {providers && Object.values(providers).map(provider => (
              <button type="button" key={Provider.name} onClick={() => signIn(provider.id, {
                prompt: "select_account",
                redirect: true,
                callbackUrl: "/"
              })}  className="black_btn">
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
      
    </nav>
  )
}

export default Nav
