// app/(route)/cart/components/summary.tsx

"use client";
import { useEffect } from "react";
import axios from "axios";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    if (!user) {
      // إذا لم يكن المستخدم مسجل الدخول، إعادة توجيهه إلى صفحة تسجيل الدخول
      router.push("/sign-in");
      return;
    }

    const userId = user.id;
    const userEmail = user.emailAddresses[0].emailAddress; // البريد الإلكتروني للمستخدم
    const userName = user.fullName || user.username || "Guest"; // اسم المستخدم أو اسم العرض

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
        userId: userId, // إرسال معرف المستخدم
        userName: userName, // إرسال اسم المستخدم
        userEmail: userEmail, // إرسال البريد الإلكتروني للمستخدم
      }
    );

    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} className=" w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
