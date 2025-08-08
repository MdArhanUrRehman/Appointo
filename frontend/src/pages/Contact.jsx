import contact_img from "../assets/contact_image.png"

export default function Contact(){
    return(
        <div>
            <div className="text-center text-2xl pt-10 text-[#707070]">
                <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
            </div>

            <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 text-sm">
                <div className="flex flex-col justify-center md:items-start gap-6">
                    <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
                    <p className="text-gray-500">Bangalore, India</p>
                    <p className="text-gray-500">Tel : +91 9916234635 <br />Email : arhanurrehman12@gmail.com</p>
                    <p className="font-semibold text-lg text-gray-600">CAREERS AT APPOINTO</p>
                    <p className="text-gray-500">Learn about more about our teams job openings</p>
                    <button className="border-2 border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
                </div>
                <img src={contact_img} alt=""  className="w-full md:w-[360px] rounded-4xl hover:shadow-xl/30 transition-all duration-300 hover:-translate-y-1"/>
            </div>
        </div>
    )
}