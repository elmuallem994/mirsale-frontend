import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-action";
import Image from "next/image";
import { User } from "lucide-react";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center mt-3">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <Image
              src="/Asset1.png"
              alt="Logo"
              width={55}
              height={55}
              className="object-contain"
            />
          </Link>
          <MainNav data={categories} />
          <NavbarActions />

          {/* استخدام مكون UserInfo لجلب بيانات المستخدم */}

          <div className="flex items-center space-x-4">
            <Link href="/order" className="flex items-center">
              <User className="text-2xl" />
              <span className="ml-2">My Orders</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
