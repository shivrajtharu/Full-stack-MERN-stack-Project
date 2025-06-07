import { Button } from "@mui/material";
import AccountSideBar from "../../components/accountSideBar";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/badge";
import { useState } from "react";

const Orders = () => {
  const [isOpenedOrderedProduct, setIsOpenedOrderedProduct] = useState(null);

  const isShowOrderedProduct = (index) => {
    if (isOpenedOrderedProduct === index) {
      setIsOpenedOrderedProduct(null);
    } else {
      setIsOpenedOrderedProduct(index);
    }
  };

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSideBar />
          </div>

          <div className="col2 w-[80%]">
            <div className="shadow-md rounded-md bg-white">
              <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
                <h2>My Orders</h2>
                <p className="mt-0">
                  There are <span className="font-bold text-primary"> 2 </span>
                  Orders
                </p>
                <div className="relative overflow-x-auto mt-5">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          &nbsp;
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Order Id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Payment Id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Products
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Address
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Pincode
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Total Amount
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          User Id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Order Status
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4 font-[500]">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => isShowOrderedProduct(0)}
                          >
                            {isOpenedOrderedProduct === 0 ? (
                              <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            ) : (
                              <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            )}
                          </Button>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary whitespace-nowrap">
                            24dw898swd086d8a9869s7
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          <span className="text-primary">pay_PTP0qgYVTt90</span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          <span className="text-primary">pay_PTP0qgYVTt90</span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          SHIVRAJ THARU
                        </td>
                        <td className="px-6 py-4 font-[500]">9845849833</td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="block w-[400px]">
                            H No 222 Street No 6 Adarsha MollaMojhaparpur
                            kathmandu Near Civil Hospital ph. +977-9858558076
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">4546</td>
                        <td className="px-6 py-4 font-[500]">3800</td>
                        <td className="px-6 py-4 font-[500]">
                          shivrajtharu62@gmail.com
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            662gasu279da98ad98daf89fa798
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <Badge status="pending" />
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          2025-01-04
                        </td>
                      </tr>
                      {isOpenedOrderedProduct === 0 && (
                        <>
                          <tr>
                            <td className="pl-20" colSpan={6}>
                              <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Id
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Tite
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Image
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Quantity
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Price
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        SubTotal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-white border-b border-gray-200">
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="text-gray-600 whitespace-nowrap">
                                          24dw898swd086d8a9869s7
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                        A-Line Kurti With Saharara &Du...
                                      </td>
                                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                        <img
                                          src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                          className="w-[40px] h-[40px] rounded-md object-cover"
                                        />
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        2
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        1300
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        1300
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="pl-20" colSpan={6}>
                              <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Id
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Tite
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Image
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Quantity
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Price
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        SubTotal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-white border-b border-gray-200">
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="text-gray-600 whitespace-nowrap">
                                          24dw898swd086d8a9869s7
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                        A-Line Kurti With Saharara &Du...
                                      </td>
                                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                        <img
                                          src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                          className="w-[40px] h-[40px] rounded-md object-cover"
                                        />
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        2
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        1300
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        1300
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </>
                      )}


                      <tr className="bg-white border-b border-gray-200">
                        <td className="px-6 py-4 font-[500]">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => isShowOrderedProduct(1)}
                          >
                            {isOpenedOrderedProduct === 1 ? (
                              <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            ) : (
                              <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            )}
                          </Button>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary whitespace-nowrap">
                            24dw898swd086d8a9869s7
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          <span className="text-primary">pay_PTP0qgYVTt90</span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          <span className="text-primary">pay_PTP0qgYVTt90</span>
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          SHIVRAJ THARU
                        </td>
                        <td className="px-6 py-4 font-[500]">9845849833</td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="block w-[400px]">
                            H No 222 Street No 6 Adarsha MollaMojhaparpur
                            kathmandu Near Civil Hospital ph. +977-9858558076
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">4546</td>
                        <td className="px-6 py-4 font-[500]">3800</td>
                        <td className="px-6 py-4 font-[500]">
                          shivrajtharu62@gmail.com
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <span className="text-primary">
                            662gasu279da98ad98daf89fa798
                          </span>
                        </td>
                        <td className="px-6 py-4 font-[500]">
                          <Badge status="pending" />
                        </td>
                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          2025-01-04
                        </td>
                      </tr>
                      {isOpenedOrderedProduct === 1 && (
                        <>
                          <tr>
                            <td className="pl-20" colSpan={6}>
                              <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Id
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Tite
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Image
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Quantity
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Price
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        SubTotal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-white border-b border-gray-200">
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="text-gray-600 whitespace-nowrap">
                                          24dw898swd086d8a9869s7
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                        A-Line Kurti With Saharara &Du...
                                      </td>
                                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                        <img
                                          src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                          className="w-[40px] h-[40px] rounded-md object-cover"
                                        />
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        2
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        1300
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        1300
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="pl-20" colSpan={6}>
                              <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Id
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Product Tite
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Image
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Quantity
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        Price
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-6 py-3 whitespace-nowrap"
                                      >
                                        SubTotal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-white border-b border-gray-200">
                                      <td className="px-6 py-4 font-[500]">
                                        <span className="text-gray-600 whitespace-nowrap">
                                          24dw898swd086d8a9869s7
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                        A-Line Kurti With Saharara &Du...
                                      </td>
                                      <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                        <img
                                          src="https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp"
                                          className="w-[40px] h-[40px] rounded-md object-cover"
                                        />
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        2
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        1300
                                      </td>
                                      <td className="px-6 py-4 font-[500]">
                                        1300
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
