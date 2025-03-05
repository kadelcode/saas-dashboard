"use client"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import SalesChart from "@/components/Saleschart";

const data = [
    { name: "Jan", users: 200 },
    { name: "Feb", users: 500 },
    { name: "Mar", users: 800 },
    { name: "Apr", users: 1100 },
    { name: "May", users: 1400 },
]

const Analytics = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Growth</h1>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

            <h1 className="text-2xl font-bold mb-4">Sales</h1>
            <SalesChart />
        </div>
    )
}

export default Analytics;