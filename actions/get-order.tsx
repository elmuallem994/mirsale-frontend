//  actions/get-order.tsx

import { Order } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrder = async (orderId: string): Promise<Order> => {
  const res = await fetch(`${URL}/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch order details");
  }

  return res.json();
};

export default getOrder;
