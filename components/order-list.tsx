import { Order } from "@/types";
import NoResults from "@/components/ui/no-results";
import OrderCard from "./ui/order-card";

interface OrderListProps {
  title: string;
  items: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <OrderCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};
export default OrderList;
