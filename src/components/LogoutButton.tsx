import { logout } from "@/lib/auth";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <button onClick={handleLogout} className="bg-gray-700 text-white p-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;
