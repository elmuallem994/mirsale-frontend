//  actions/post-formdata.tsx

import { FormData } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/formdata`;

interface Query {
  orderId?: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  additionalNotes?: string;
}

const postFormData = async (query: Query): Promise<FormData> => {
  const {
    orderId,
    senderName,
    senderPhone,
    recipientName,
    recipientPhone,
    recipientAddress,
    additionalNotes,
  } = query;

  const res = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderId,
      senderName,
      senderPhone,
      recipientName,
      recipientPhone,
      recipientAddress,
      additionalNotes,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Form Data");
  }

  return res.json();
};

export default postFormData;
