import Button from "./ui/Button";

export default function MessageForm() {
  return (
    <form>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#0156D2] font-semibold uppercase">
            Your name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="text-sm text-[#22222289] leading-8 rounded-lg bg-[#f6f8fb] border border-[#0145A814] py-3 px-2.5"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#0156D2] font-semibold uppercase">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="text-sm text-[#22222289] leading-8 rounded-lg bg-[#f6f8fb] border border-[#0145A814] py-3 px-2.5"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#0156D2] font-semibold uppercase">
            Your Message
          </label>
          <textarea
            placeholder="Briefly tell us about your message"
            className="text-sm text-[#22222289] h-50 leading-8 rounded-lg bg-[#f6f8fb] border border-[#0145A814] py-3 px-2.5"
          />
        </div>
        <div></div>
        <Button className="w-full bg-[#0245a8] text-base text-[#F7F4EF] font-medium leading-6.5 py-4">
          Send Message
        </Button>
      </div>
    </form>
  );
}
