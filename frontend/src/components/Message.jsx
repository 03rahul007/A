import React from 'react';
import MessageModal from '../MessageModal';

const Message = () => {
  return (
    <div className="absoluted ">
      {/* Message component, hidden on small screens */}
      <div className="hidden md:flex py-8 px-8 max-w-sm mx-auto bg-gray-800 w-[25rem] rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 items-center absolute left-12 bottom-16 z-20 animate-float">
        {/* <img
          // className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
          src="../pic.png"
          // alt="Men's Face"
        /> */}
        <div className="text-center space-y-2 sm:text-left  ">
          <div className="space-y-0.5">
            <p className="text-lg text-indigo-600 font-semibold">Rahul Verma</p>
            <p className="text-slate-500 font-medium">Tech Genius</p>
          </div>
          {/* Modal button for larger screens */}
          <button className=" px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          <MessageModal />
          </button>
        </div>
      </div>

      {/* "Send Message" button visible on all screen sizes */}
      <div className="lg:right-15 lg:bottom-28 lg:right-15 md:hidden flex justify-center items-center absolute bottom-48 left-0 right-0">
        <button className="px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        <MessageModal />
        </button>
      </div>
    </div>
  );
};

export default Message;
