import Taskbar from "../components/taskbar"
import HeroHeader from "../components/heroHeader"
import AboutUs from "../components/AboutUs";
import CategoryCarousel from "../components/Categories";
import Reason from "../components/ChoosingUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer"

export default function HomePage(){

    return <div className="max-h-fit max-w-full">
        <Taskbar isAdmin={false} isLoggedIn={true}/>
    <HeroHeader/>
    <AboutUs/>
    <CategoryCarousel/>
    <Reason/>
    <Testimonials/>
    <Footer/>
    </div>
}