import { X } from "lucide-react";
import Scheldule from "../assets/scheldule.png";

export default function ThankYou({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative max-h-[90vh] w-full max-w-11/12 overflow-hidden rounded-xl md:rounded-3xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 md:right-6 md:top-6 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={20} className="text-[#222222]" />
        </button>

        {/* Content */}
        <div
          className="relative flex min-h-90 md:min-h-180 justify-center overflow-hidden rounded-xl md:rounded-3xl border-[0.2px] border-[#00000033] px-6 py-10 md:px-15 md:py-15"
          style={{
            background:
              "linear-gradient(78.97deg, rgba(28,28,126,0.8) 9.02%, rgba(139,143,168,0.8) 43.05%, rgba(218,85,72,0.4) 63.19%, rgba(218,85,72,0.64) 102.35%)",
          }}
        >
          {/* Heading */}
          <h4 className="relative z-10 mt-10 md:mt-30 text-center text-[28px] md:text-[56px] font-medium leading-tight text-[#F7F4EF] md:leading-20">
            Thanks for sending a review
          </h4>

          {/* Image */}
          <div className="absolute top-80 md:top-128">
            <img
              src={Scheldule}
              alt=""
              className="h-full w-full scale-200 md:scale-150 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}