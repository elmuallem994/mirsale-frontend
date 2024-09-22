"use client";

import { Order } from "@/types";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

interface OrderCard {
  data: Order;
}

const OrderCard: React.FC<OrderCard> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/order/${data?.id}`);
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          {/* تاريخ الشراء */}
          <p className="text-sm text-gray-500">
            {data.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : "تاريخ غير متاح"}
          </p>

          {/* السعر الإجمالي */}
          <p className="font-bold text-lg">
            Toplam:{" "}
            <span className="text-orange-500">
              {data.orderItems?.[0]?.productPrice
                ? `${data.orderItems[0].productPrice} TL`
                : "غير متاح"}
            </span>
          </p>
        </div>
        <div>
          {/* عرض حالة الطلب مع علامة الصح في حالة التسليم */}
          <span className="flex items-center font-bold text-green-500 border p-2 rounded-lg ">
            {data.status === "تم التسليم" && (
              <CheckCircle className="w-5 h-5 mr-1 text-green-600" />
            )}
            {data.status}
          </span>
        </div>
      </div>

      <div className="flex items-center mt-4">
        {/* صورة المنتج */}
        <Image
          src={data?.orderItems?.[0]?.productImageUrl}
          alt={data?.orderItems?.[0]?.productName}
          width={64}
          height={64}
          className="aspect-square object-cover rounded-md"
        />
        <div className="ml-4">
          {/* عدد المنتجات */}
          <p className="text-sm text-gray-500">{data.orderItems.length} منتج</p>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        {/* زر لعرض التفاصيل */}
        <button onClick={handleClick} className="text-orange-500 font-semibold">
          التفاصيل
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
