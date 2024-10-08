export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string | null; // يمكن أن يكون null إذا تم حذف المنتج
  productName: string;
  productPrice: string; // تخزين السعر كـ string لتفادي مشاكل الدقة
  productImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  storeId: string;
  userId: string;
  userName: string;
  userEmail: string;
  isPaid: boolean;
  status: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItem[];
  user: User; // ربط الطلب بالمستخدم
}

export interface FormData {
  id: string;
  orderId?: string; // معرف الطلب المرتبط
  senderName: string; // اسم المرسل
  senderPhone: string; // هاتف المرسل
  recipientName: string; // اسم المستلم
  recipientPhone: string; // هاتف المستلم
  recipientAddress: string; // عنوان المستلم
  additionalNotes?: string; // ملاحظات إضافية
  createdAt: Date; // تاريخ الإنشاء
  updatedAt: Date; // تاريخ آخر تحديث
}
