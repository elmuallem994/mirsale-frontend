// app/(route)/cart/components/summary.tsx

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormUserData } from "@/components/form-user-data";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface FormDataType {
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  additionalNotes?: string;
}

const Summary = () => {
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  // Handle form submission
  const handleFormSubmit = (formData: FormDataType) => {
    setFormData(formData); // حفظ البيانات مؤقتًا
    setIsFormSubmitted(true); // تحديث حالة الإرسال
    setIsDialogOpen(false); // إغلاق النافذة المنبثقة بعد الإرسال
  };

  const onCheckout = async () => {
    if (!user) {
      // إذا لم يكن المستخدم مسجل الدخول، إعادة توجيهه إلى صفحة تسجيل الدخول
      router.push("/sign-in");
      return;
    }

    if (!formData) {
      // التأكد من أن بيانات formData ليست فارغة قبل الدفع
      toast.error("يرجى تعبئة بيانات المرسل والمستلم قبل المتابعة.");
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
        formData, // Pass formData to the API
      }
    );

    // إعادة توجيه إلى صفحة النجاح
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

      {/* Display either the form button or checkout button */}
      {!isFormSubmitted ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full mt-6 font-semibold text-base bg-yellow-400 hover:bg-yellow-500 text-white"
              disabled={items.length === 0}
            >
              متابعة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة معلومات الطلب</DialogTitle>
              <DialogDescription>
                يرجى تعبئة الحقول المطلوبة قبل المتابعة.
              </DialogDescription>
            </DialogHeader>
            <FormUserData onFormSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          onClick={onCheckout}
          className="w-full mt-6 font-semibold text-base bg-red-500 hover:bg-red-600 text-white"
        >
          تأكيد ودفع
        </Button>
      )}
    </div>
  );
};

export default Summary;
