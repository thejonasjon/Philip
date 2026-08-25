import AboutMeSection from "../Components/AboutMeSection";
import FAQSection from "../Components/FAQSection";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import MessageSection from "../Components/MessageSection";
import MomentSection from "../Components/MomentSection";
import Navbar from "../Components/navbar";
import ScheduleLesson from "../Components/ScheduleLesson";
import TestimonialSection from "../Components/TestimonialSection";
import TutorialSection from "../Components/TutorialSection";
import VideoSection from "../Components/VideoSection";

export default function Home() {


  return (
    <div className="mt-12">
      <Navbar />

      <Hero />
      <VideoSection />
      <AboutMeSection />
      <TutorialSection />
      <MomentSection />
      <TestimonialSection />
      <ScheduleLesson />
      <FAQSection />
      <MessageSection />
    </div>
  );
}
