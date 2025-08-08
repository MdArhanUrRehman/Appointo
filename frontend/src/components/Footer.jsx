import logo from "../assets/logo.png";

export default function Footer() {
  return (
   <div className="bottom-0 left-0 w-full">
  <div className="bg-[#284B63]">
    <div className="flex flex-col md:flex-row text-sm gap-10 p-7">
      {/* Logo & description */}
      <div>
        <img src={logo} alt="" className="w-25" />
        <p className="w-full md:w-2/3 text-white leading-6">
          “Appointo makes healthcare simple. Book appointments with trusted
          doctors and specialists from the comfort of your home. Your health,
          your convenience, our priority.”
        </p>
      </div>

      <div>
        <p className="text-xl font-medium mb-5 text-white">COMPANY</p>
        <ul className="flex flex-col gap-4 text-white w-32 cursor-pointer">
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>DELIVERY</li>
          <li>PRIVACY POLICY</li>
        </ul>
      </div>

      <div className="mr-10">
        <p className="text-xl font-medium mb-5 text-white">GET IN TOUCH</p>
        <ul className="flex flex-col gap-2 text-white">
          <li>+91 9916234635</li>
          <li>arhanurrehman12@gmail.com</li>
        </ul>
      </div>
    </div>

    <div>
      <hr className="border-[#fff]" />
      <p className="py-3 text-sm px-5 sm:px-0 text-center text-white">
        Copyright 2025 @Appointo.com - All Right Reserved.
      </p>
    </div>
  </div>
</div>

  );
}
