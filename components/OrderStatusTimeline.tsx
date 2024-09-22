import { CheckCircle, Truck, Home, Package } from "lucide-react"; // استيراد الأيقونات المطلوبة

interface StatusProps {
  status: string;
}

const OrderStatusTimeline: React.FC<StatusProps> = ({ status }) => {
  const statusList = [
    { name: "تم استلام الطلب", icon: <Package /> },
    { name: "يتم تجهيز طلبكم", icon: <Home /> },
    { name: "الطلب في الشحن", icon: <Truck /> },
    { name: "تم تسليم طلبكم", icon: <CheckCircle /> },
  ];

  // الحصول على الفهرس بناءً على حالة الطلب
  const statusIndex = statusList.findIndex((item) => item.name === status);

  return (
    <div className="flex justify-between items-center w-[40%] relative">
      {statusList.map((item, index) => (
        <div key={index} className="relative flex flex-col items-center">
          {/* إضافة الخط الواصل */}
          {index < statusList.length - 1 && (
            <div
              className={`absolute flex top-[30%] left-12 w-32 h-1 ${
                index < statusIndex ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
          )}
          {/* عرض الأيقونة بناءً على الحالة */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-100 ${
              index <= statusIndex ? "bg-green-500" : "bg-gray-300"
            } ${index === statusIndex ? "pulsing-icon " : ""}`}
          >
            {item.icon}
          </div>
          <p className="text-sm text-center">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusTimeline;
