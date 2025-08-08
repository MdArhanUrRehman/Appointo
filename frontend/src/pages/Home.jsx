import Header from "../components/Header"
import SpecialityMenu from "../components/SpeaialtiMenu"
import TopDoctors from "../components/TopDoctors"
import Banner from "../components/Banner"
import TypingText from "../components/TypingText"

export default function Home(){

    return(
        <div>
            <TypingText/>
            <Header/>
            <SpecialityMenu/>
            <TopDoctors/>
            <Banner/>
        </div>
    )
}