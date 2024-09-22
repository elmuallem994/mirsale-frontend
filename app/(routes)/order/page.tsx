//  app/(routes)/order/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // جلب معلومات المستخدم من Clerk
import getOrders from "@/actions/get-orders"; // دالة لجلب الطلبات من API
import { Order } from "@/types"; // استيراد نوع الطلبات
import Container from "@/components/ui/container";
import OrderList from "@/components/order-list";

const OrdersPage = () => {
  const { user } = useUser(); // جلب بيانات المستخدم
  const [orders, setOrders] = useState<Order[]>([]); // تخزين الطلبات
  const [error, setError] = useState<string | null>(null); // تخزين الخطأ إن وجد
  const [loading, setLoading] = useState<boolean>(true); // حالة التحميل

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) {
          throw new Error("User is not authenticated");
        }

        const userId = user.id;

        // جلب الطلبات بناءً على معرف المستخدم
        const fetchedOrders = await getOrders(userId);
        setOrders(fetchedOrders); // تخزين الطلبات في الحالة
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false); // إنهاء حالة التحميل
      }
    };
    if (user) {
      fetchOrders(); // استدعاء الدالة لجلب الطلبات
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <OrderList title="My Orders" items={orders} />
        </div>
      </Container>
    </div>
  );
};

export default OrdersPage;
