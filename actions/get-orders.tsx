// actions/get-orders.tsx
import { Order } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrders = async (userId: string): Promise<Order[]> => {
  const res = await fetch(`${URL}?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
};

export default getOrders;
