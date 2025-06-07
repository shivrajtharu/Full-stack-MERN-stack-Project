import { LiaShippingFastSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { Button } from "@mui/material";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import Drawer from "@mui/material/Drawer";
import { useContext } from "react";
import { MyContext } from "../../App";
import CartPanel from "../cartPanel";
import { IoCloseSharp } from "react-icons/io5";

const Footer = () => {
  const context = useContext(MyContext)

  return (
    <>
      <footer className="py-6 bg-[#fafafa] border border-t-1 border-[rgba(0,0,0,0.1)]">
        <div className="container">
          <div className="flex items-center justify-center gap-2 py-8 mb-8">
            <div className="col flex flex-col items-c   enter justify-center group w-[15%]">
              <LiaShippingFastSolid className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-semibold mt-3">Free Shipping</h3>
              <p className="text-[12px] font-[500]">
                {" "}
                For all Orders Over $10{" "}
              </p>
            </div>
            <div className="col flex flex-col items-center justify-center group w-[15%]">
              <PiKeyReturnLight className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-semibold mt-3">
                30 Days Returns
              </h3>
              <p className="text-[12px] font-[500]">For an exchange product</p>
            </div>
            <div className="col flex flex-col items-center justify-center group w-[15%]">
              <BsWallet2 className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-semibold mt-3">
                Secured Payment
              </h3>
              <p className="text-[12px] font-[500]">Payment Cards Accepted</p>
            </div>
            <div className="col flex flex-col items-center justify-center group w-[15%]">
              <LiaGiftSolid className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-semibold mt-3">Special Gifts</h3>
              <p className="text-[12px] font-[500]">Our First Product Order</p>
            </div>
            <div className="col flex flex-col items-center justify-center group w-[15%]">
              <BiSupport className="text-[40px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-semibold mt-3">Support 24/7</h3>
              <p className="text-[12px] font-[500]">Contact Us Any Time</p>
            </div>
          </div>
          <br />

          <hr />

          <div className="footer flex py-8">
            <div className="part1 w-[25%] border-r border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[18px] font-semibold mb-4">Contact Us</h2>
              <p className="text-[13px] font-[400] pb-4">
                ClassyShop - Mega Super Store <br />
                507-Union Trade Centre <br /> France
              </p>
              <Link
                to="mailto:someone@example.com"
                className="link text-[13px]  "
              >
                sales@yourcompany.com
              </Link>
              <span className="text-[21px] font-semibold block w-full mt-3 mb-3 text-primary">
                (+977) 9845-658-898
              </span>

              <div className="flex items-center gap-2">
                <HiOutlineChatAlt2 className="text-[50px] text-primary mb-5" />
                <span className="text-[16px] font-semibold pl-3">
                  Online Chat <br />
                  Get Expert Help
                </span>
              </div>
            </div>

            <div className="part2 w-[40%] flex pl-8">
              <div className="part2_col1 w-[50%]">
                <h2 className="text-[18px] font-semibold mb-4">Products</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Prices Drop
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      New Products
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Best Sales
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Contact Us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Sitemap
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Stores
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="part2_col2 w-[50%]">
                <h2 className="text-[18px] font-semibold mb-4">Our Company</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Delivery
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Legal Notice
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Terms And Conditions of Use
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      About Us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Secure Payment
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="part2 w-[35%] flex pl-8 flex-col pr-8">
              <h2 className="text-[18px] font-semibold mb-4">
                Subscribe To Newsletter
              </h2>
              <p className="text-[13px]">
                Subscribe to our latest newsletter to get news about special
                discounts.
              </p>

              <form className="mt-5">
                <input
                  type="text"
                  className="w-full h-[45px] border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]"
                  placeholder="Your Email address"
                ></input>
                <Button className="btn-org">SUBSCRIBE</Button>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I agree to the terms and conditions and the privacy policy"
                />
              </form>
            </div>
          </div>
        </div>
      </footer>

      <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] py-4 bg-white">
        <div className="container flex items-center justify-between">
          <ul className="flex items-center gap-2">
            <li className="list-none">
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all "
              >
                <FaFacebookF className="text-[17px] group-hover:text-white text-black" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all "
              >
                <AiOutlineYoutube className="text-[22px] group-hover:text-white text-black" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all "
              >
                <FaPinterestP className="text-[17px] group-hover:text-white text-black" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="/"
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-primary transition-all "
              >
                <FaInstagram className="text-[17px] group-hover:text-white text-black" />
              </Link>
            </li>
          </ul>

          <p className="text-[13px] text-center mb-0">
            © 2024 - Ecommerce Template
          </p>
          <div className="flex items-center">
            <img src="/carte_blue.png" alt="Image" />
            <img src="/visa.png" alt="Image" />
            <img src="/master_card.png" alt="Image" />
            <img src="/american_express.png" alt="Image" />
            <img src="/paypal.png" alt="Image" />
          </div>
        </div>
      </div>

      {/* Cart Panel */}
      <Drawer
        open={context.openCartPanel}
        onClose={context.toggleCartPannel(false)}
        anchor={"right"}
        className="cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4>Shopping Cart (1)</h4>
          <IoCloseSharp
            className="text-[20px] cursor-pointer"
            onClick={context.toggleCartPannel(false)}
          />
        </div>

        <CartPanel/>

      </Drawer>
    </>
  );
};

export default Footer;
