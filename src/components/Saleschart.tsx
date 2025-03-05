import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
    { name: "Jan", sales: 1200 },
    { name: "Feb", sales: 2100 },
    { name: "Mar", sales: 800 },
    { name: "Apr", sales: 1600 },
    { name: "May", sales: 3000 },
];

const SalesChart = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
        </ResponsiveContainer>
    )
}

export default SalesChart;