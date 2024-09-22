// app/(routes)/order/[orderId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // لجلب معرف الطلب من الـ URL
import { useUser } from "@clerk/nextjs"; // لجلب بيانات المستخدم
import getOrder from "@/actions/get-order"; // دالة لجلب تفاصيل الطلب من API
import { Order } from "@/types"; // استيراد نوع الطلبات
import Container from "@/components/ui/container";
import Currency from "@/components/ui/currency";
import OrderStatusTimeline from "@/components/OrderStatusTimeline";
import Image from "next/image";

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // جلب معرف الطلب من الـ URL
  const { user } = useUser(); // جلب بيانات المستخدم
  const [order, setOrder] = useState<Order | null>(null); // تخزين تفاصيل الطلب
  const [loading, setLoading] = useState(true); // حالة تحميل
  const [error, setError] = useState<string | null>(null); // تخزين الأخطاء

  // دالة لجلب تفاصيل الطلب بناءً على معرف الطلب
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!user) {
          throw new Error("User is not authenticated");
        }

        const id = Array.isArray(orderId) ? orderId[0] : orderId; // تحويل orderId إلى string إذا كان في شكل مصفوفة
        const fetchedOrder = await getOrder(id); // جلب تفاصيل الطلب بناءً على معرف الطلب
        setOrder(fetchedOrder); // تخزين تفاصيل الطلب
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setLoading(false); // إنهاء حالة التحميل
      }
    };

    if (user && orderId) {
      fetchOrderDetails(); // استدعاء الدالة لجلب تفاصيل الطلب
    }
  }, [user, orderId]); // تضمين user و orderId في الـ dependency

  if (loading) {
    return <div>Loading...</div>; // عرض رسالة تحميل
  }

  if (error) {
    return <div>{error}</div>; // عرض رسالة خطأ
  }

  if (!order) {
    return <div>No order found</div>; // عرض رسالة في حال عدم العثور على الطلب
  }

  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">تفاصيل الطلب</h1>

        {/* تفاصيل الطلب */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">المنتجات:</h2>
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex items-center border-b py-2">
                {/* صورة المنتج */}
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={item.productImageUrl}
                    alt={item.productName}
                    width={64}
                    height={64}
                    className="aspect-square object-cover rounded-md"
                  />
                </div>

                <div className="ml-4">
                  {/* اسم المنتج وسعره */}
                  <p>{item.productName}</p>
                  <Currency value={item.productPrice} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="text-lg font-semibold">إجمالي السعر:</p>
            <Currency
              value={order.orderItems.reduce(
                (total, item) => total + Number(item.productPrice),
                0
              )}
            />
          </div>

          <div>
            <p className="text-lg font-semibold">حالة الطلب:</p>
            <OrderStatusTimeline status={order.status} />
          </div>

          <div>
            <p className="text-lg font-semibold">العنوان:</p>
            <p>{order.address}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailsPage;
