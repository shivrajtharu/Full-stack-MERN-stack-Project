import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = () => {
  return (
    <>
      <section className="py-10">
        <div className="container flex gap-5">
          <div className="leftCol w-[70%]">
            <div className="card shadow-md bg-white p-5 rounded-md w-full">
              <h1 className="uppercase">Billing Details</h1>

              <form className="w-full mt-5">
                <div className="flex items-center gap-5 pb-5">
                  <div className="col w-[50%]">
                    <TextField
                      className="w-full bg-[#f1f1f1]"
                      label="Full Name *"
                      variant="outlined"
                      size="small"
                    />
                  </div>

                  <div className="col w-[50%]">
                    <TextField
                      className="w-full bg-[#f1f1f1]"
                      label="Country *"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
                <h6 className="text-[14px] font-[600] mb-2">
                  Street address *
                </h6>
                <div className="flex items-center gap-5 pb-5">
                  <div className="col w-[100%]">
                    <TextField
                      className="w-full bg-[#f1f1f1]"
                      label="House Number and Street name"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-5 pb-5">
                  <div className="col w-[100%]">
                    <TextField
                      className="w-full bg-[#f1f1f1]"
                      label="Apartment, suit, unit, etc. (optional)"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-5 pb-5">
                  <div className="col w-[50%]">
                    <TextField
                      className="w-full bg-[#f1f1f1]"
                      label="State / Country *"
                      variant="outlined"
                      size="small"
                    />
                  </div>

                  <div className="col w-[50%]">
                    <TextField
                      className="w-full bg-[#f1f1f1]"
                      label="Town / City *"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>

                <h6 className="text-[14px] font-[600] mb-2">
                  Postcode / ZIP *
                </h6>
                <div className="flex items-center gap-5 pb-5">
                  <div className="col w-[100%]">
                    <TextField
                      className="w-full bg-[#f1f1f1]"
                      label="Zip Code"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-5 pb-5">
                  <div className="col w-[50%]">
                    <TextField
                      className="w-full bg-[#f1f1f1]"
                      label="Phone Number *"
                      variant="outlined"
                      size="small"
                    />
                  </div>

                  <div className="col w-[50%]">
                    <TextField
                      type="email"
                      className="w-full bg-[#f1f1f1]"
                      label="Email Address"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="rightCol w-[30%]">
            <div className="card shadow-md bg-white p-5 rounded-md">
              <h2 className="mb-4 uppercase">Your Order</h2>
              <div className=" flex items-center justify-between py-2 border-t border-b border-[rgba(0,0,0,0.1)]">
                <span className="text-[14px] font-[600]">Product</span>
                <span className="text-[14px] font-[600]">SubTotal</span>
              </div>

              <div className="scroll max-h-[250px] overflow-y-scroll overflow-x-hidden pr-2 mb-5">
                <div className="flex items-center justify-between py-2">
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md cursor-pointer group">
                      <img
                        src="https://api.spicezgold.com/download/file_1734526836569_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-0-202403231855.jpg"
                        className="w-full transition-all group-hover:scale-105"
                      />
                    </div>

                    <div className="info">
                      <h4 className="text-[14px]">A-Line Kurti with Sh...</h4>
                      <span className="text-[13px]">Qty : 1</span>
                    </div>
                  </div>

                  <span className="text-[14px] font-[500]">$1300.00</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md cursor-pointer group">
                      <img
                        src="https://api.spicezgold.com/download/file_1734526836569_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-0-202403231855.jpg"
                        className="w-full transition-all group-hover:scale-105"
                      />
                    </div>

                    <div className="info">
                      <h4 className="text-[14px]">A-Line Kurti with Sh...</h4>
                      <span className="text-[13px]">Qty : 1</span>
                    </div>
                  </div>

                  <span className="text-[14px] font-[500]">$1300.00</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md cursor-pointer group">
                      <img
                        src="https://api.spicezgold.com/download/file_1734526836569_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-0-202403231855.jpg"
                        className="w-full transition-all group-hover:scale-105"
                      />
                    </div>

                    <div className="info">
                      <h4 className="text-[14px]">A-Line Kurti with Sh...</h4>
                      <span className="text-[13px]">Qty : 1</span>
                    </div>
                  </div>

                  <span className="text-[14px] font-[500]">$1300.00</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md cursor-pointer group">
                      <img
                        src="https://api.spicezgold.com/download/file_1734526836569_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-0-202403231855.jpg"
                        className="w-full transition-all group-hover:scale-105"
                      />
                    </div>

                    <div className="info">
                      <h4 className="text-[14px]">A-Line Kurti with Sh...</h4>
                      <span className="text-[13px]">Qty : 1</span>
                    </div>
                  </div>

                  <span className="text-[14px] font-[500]">$1300.00</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md cursor-pointer group">
                      <img
                        src="https://api.spicezgold.com/download/file_1734526836569_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-0-202403231855.jpg"
                        className="w-full transition-all group-hover:scale-105"
                      />
                    </div>

                    <div className="info">
                      <h4 className="text-[14px]">A-Line Kurti with Sh...</h4>
                      <span className="text-[13px]">Qty : 1</span>
                    </div>
                  </div>

                  <span className="text-[14px] font-[500]">$1300.00</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="part1 flex items-center gap-3">
                    <div className="img w-[50px] h-[50px] object-cover overflow-hidden rounded-md cursor-pointer group">
                      <img
                        src="https://api.spicezgold.com/download/file_1734526836569_modestouze-attires-women-s-mukaish-worked-ethnic-jacket-with-top-and-pant-set-product-images-rvziicqwq6-0-202403231855.jpg"
                        className="w-full transition-all group-hover:scale-105"
                      />
                    </div>

                    <div className="info">
                      <h4 className="text-[14px]">A-Line Kurti with Sh...</h4>
                      <span className="text-[13px]">Qty : 1</span>
                    </div>
                  </div>

                  <span className="text-[14px] font-[500]">$1300.00</span>
                </div>
              </div>

              <Button className="btn-org btn-lg w-full flex gap-2">
                <BsFillBagCheckFill className="text-[20px]" />
                Chekout
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
