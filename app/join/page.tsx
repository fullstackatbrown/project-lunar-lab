"use client"
import { useRouter } from "next/navigation";

export default function JoinPage() {

  const router = useRouter();

  
    return (
      <main className="mx-[20px] lg:mx-[90px] mt-[20px] mb-[50px]">
        <header className="mb-[30px]">
          <h1 className="italic text-[70px] mb-[20px]">Join the Lab</h1>
          <div className="text-[19px] mb-[30px]">
            <p>For Brown Students (PhD, Masters, Undergraduates)</p>
            <p>Please sign up for the <a href="https://lists.cs.brown.edu/wws/info/nlu" className="cursor-pointer underline">NLU mailing list</a> for announcements about lab meetings and project openings:</p>
          </div>
          <button className="text-[19px] text-[#F9E4C8] w-[270px] h-[47px] bg-[#323C50] rounded-2xl cursor-pointer [html[data-theme=dark]_&]:bg-[#F9E4C8] [html[data-theme=dark]_&]:text-[#323C50]" onClick={() => router.push("/about")}>Sign up to mailing list &thinsp; &gt;</button>
        </header>

        <div className="mt-[50px] lg:mt-[100px]">
          <ul className="flex flex-col lg:flex-row gap-[48px] w-full">
            <li className="flex flex-col flex-1 outline outline-[1px] h-[397px] px-[30px] py-[31px] lg:pl-[41px]">
                <h2 className="italic text-[70px]">Program Name</h2>
                <p className="text-[19px] lg:w-[450px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <button className="self-end w-[124px] h-[47px] text-[19px] outline outline-[1px] rounded-xl px-[13px] py-[10px]  mt-[40px] mr-[30px] cursor-pointer" onClick={() => router.push("/about")}>Apply &thinsp; &gt;</button>
            </li>
            <li className="flex flex-col flex-1 outline outline-[1px] h-[397px] px-[30px] lg:pl-[41px] py-[31px]">
                <h2 className="italic text-[70px]">Program Name</h2>
                <p className="text-[19px] lg:w-[450px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <button className="self-end w-[124px] h-[47px] text-[19px] outline outline-[1px] rounded-xl px-[13px] py-[10px] mt-[40px] mr-[30px] cursor-pointer" onClick={() => router.push("/about")}>Apply &thinsp; &gt;</button>
            </li>
          </ul>
        </div>

        
      </main>
    );
  }
  