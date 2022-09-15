import Image from "next/image";
import Amex from "../images/card_images/amex.png";
import Cash from "../images/card_images/cash.png";
import Discover from "../images/card_images/discover.png";
import Master from "../images/card_images/maestro.png";
import Stirpe from "../images/card_images/stripe.png";
import Visa from "../images/card_images/visa.png";

export default function CardData({ card_data }) {
  const { card_name, payment_amount, payment_date } = card_data;

  // define the card image
  const card = () => {
    if (card_name === "mastercard") {
      return <Image src={Master} alt="card image" width={50} height={50} />;
    } else if (card_name === "discover") {
      return <Image src={Discover} alt="card image" width={50} height={50} />;
    } else if (card_name === "visa") {
      return <Image src={Visa} alt="card image" width={50} height={50} />;
    } else if (card_name === "stripe card") {
      return <Image src={Stirpe} alt="card image" width={50} height={50} />;
    } else if (card_name === "amex") {
      return <Image src={Amex} alt="card image" width={50} height={50} />;
    } else if (card_name === "cash-on") {
      return <Image src={Cash} alt="card image" width={50} height={50} />;
    }
  };

  return (
    <div id="payment_card_table">
      <span id="card_info">{card()}</span>
      <span id="card_info">{card_name}</span>
      <span id="card_info" className=" !text-green font-semibold">
        ৳ {payment_amount}
      </span>
      <span id="card_info">{payment_date}</span>
    </div>
  );
}

// export default function CardData({ card_data }) {
//   const order_date = `${card_data?.order_overview?.order_date?.date} / ${card_data?.order_overview?.order_date?.month} / ${card_data?.order_overview?.order_date?.year}`;

//

//   return (
//     <div id="payment_card_table">
//       <span id="card_info">
//         {card()}
//         {/* <Image src={card_img} alt="card image" width={50} height={50} /> */}
//       </span>
//       <span id="card_info">{card_data?.payment_info?.card_name}</span>
//       <span id="card_info" className=" !text-green font-semibold">
//         {card_data?.order_overview?.total_amount}
//       </span>
//       <span id="card_info">{order_date}</span>
//     </div>
//   );
// }
