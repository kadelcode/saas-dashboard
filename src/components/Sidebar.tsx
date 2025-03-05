import { Home, BarChart, Users} from "lucide-react"; // Import icons
import Link from "next/link"; // Import Link component

// Functional component
const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-900 h-screen text-white p-4 hidden md:block">
            <h2 className="text-xl font-bold">SaaS Dashboard</h2>
            <nav className="mt-6">
                <ul>
                    <li className="mb-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Home size={20} /> Dashboard
                        </Link>
                    </li>

                    <li className="mb-4">
                        <Link href="/users" className="flex items-center gap-2">
                            <Users size={20} /> Users
                        </Link>
                    </li>

                    <li className="mb-4">
                        <Link href="/analytics" className="flex items-center gap-2">
                            <BarChart size={20} /> Analytics
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;