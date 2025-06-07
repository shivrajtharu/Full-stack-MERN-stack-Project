import { IoSearch } from "react-icons/io5";

const SearchBox = () => {
  return (
    <>
        <div className='w-full flex h-auto relative overflow-hidden'>
            <IoSearch className="absolute top-[13px] left-[10px] z-50 pointer-events-none opacity-80" />
            <input  className='w-full pl-8 h-[40px] bg-[#f1f1f1] border border-[rgba(0,0,0,0.1)] p-2 focus:outline-none focus:border-[rgb(0,0,0,0.5)] rounded-md text-[13px]' placeholder="Search here..."/>
        </div>
    </>
  )
}

export default SearchBox
