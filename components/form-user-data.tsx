// components/form-user-data.tsx

"use client";

import * as z from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// مخطط Zod للتحقق من الإدخال
const formSchema = z.object({
  senderName: z.string().min(1, { message: "اسم المرسل مطلوب" }),
  senderPhone: z.string().min(1, { message: "هاتف المرسل مطلوب" }),
  recipientName: z.string().min(1, { message: "اسم المستلم مطلوب" }),
  recipientPhone: z.string().min(1, { message: "هاتف المستلم مطلوب" }),
  recipientAddress: z.string().min(1, { message: "عنوان المستلم مطلوب" }),
  additionalNotes: z.string().optional(),
});

type FormUserDataValues = z.infer<typeof formSchema>;

interface FormUserDataProps {
  onFormSubmit: (data: FormUserDataValues) => void;
}

export const FormUserData: React.FC<FormUserDataProps> = ({ onFormSubmit }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormUserDataValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: "",
      senderPhone: "",
      recipientName: "",
      recipientPhone: "",
      recipientAddress: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: FormUserDataValues) => {
    try {
      setLoading(true);
      onFormSubmit(data); // استدعاء onFormSubmit من المكون الأب
      toast.success("تم إرسال البيانات بنجاح");
    } catch (error) {
      toast.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading
        title="إضافة معلومات الطلب"
        description="يرجى تعبئة البيانات المطلوبة"
      />
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* حقل اسم المرسل */}
          <FormField
            control={form.control}
            name="senderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المرسل</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="اسم المرسل"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* حقل هاتف المرسل */}
          <FormField
            control={form.control}
            name="senderPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>هاتف المرسل</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="هاتف المرسل"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* حقل اسم المستلم */}
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المستلم</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="اسم المستلم"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* حقل هاتف المستلم */}
          <FormField
            control={form.control}
            name="recipientPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>هاتف المستلم</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="هاتف المستلم"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* حقل عنوان المستلم */}
          <FormField
            control={form.control}
            name="recipientAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان المستلم</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="عنوان المستلم"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ملاحظات إضافية */}
          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ملاحظات إضافية</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="ملاحظات إضافية"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            إرسال
          </Button>
        </form>
      </Form>
    </>
  );
};
