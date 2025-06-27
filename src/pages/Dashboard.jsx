import { Card, CardContent } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const genderCount = 3959;
const totalPosts = 4915;

const barData = [
  { year: "2017-18", posts: 1100 },
  { year: "2016-17", posts: 900 },
  { year: "2015-16", posts: 700 },
  { year: "2014-15", posts: 500 },
  { year: "2013-14", posts: 300 },
  { year: "2008-09", posts: 100 },
];

const pieData = [
  { name: "Kalaburagi", value: 269 },
  { name: "Raichur", value: 259 },
  { name: "Bagalkote", value: 244 },
  { name: "Haveri", value: 242 },
  { name: "Vijayapura", value: 214 },
  { name: "Tumkur", value: 212 },
  { name: "Belagavi", value: 208 },
  { name: "Shivamoga", value: 223 },
  { name: "Others", value: 2626 },
];

const COLORS = [
  "#FF421B",
  "#FCE212",
  "#59FF31",
  "#1AC6FF",
  "#FD92A2",
  "#CC99FF",
  "#F88800",
  "#69C9A1",
  "#C2C2C2",
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Gender Count */}
      <Card className="col-span-1 md:col-span-1 text-center shadow-xl rounded-2xl">
        <CardContent>
          <div className="flex justify-around items-center">
            <div>
              <h3 className="text-xl font-semibold text-pink-600">Female</h3>
              <p className="text-2xl font-bold">{genderCount}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600">Male</h3>
              <p className="text-2xl font-bold">{genderCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <Card className="col-span-1 md:col-span-1 shadow-xl rounded-2xl">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2 text-center">
            Number of Posts per Year
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Total Post Breakdown */}
      <Card className="col-span-1 md:col-span-1 shadow-xl rounded-2xl">
        <CardContent className="text-center">
          <h3 className="text-2xl font-bold text-sky-600">
            No. of Post - 2021
          </h3>
          <p className="text-4xl font-extrabold my-4">{totalPosts}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>DOM:</strong> 46
            </div>
            <div>
              <strong>District Office:</strong> 322
            </div>
            <div>
              <strong>College:</strong> 399
            </div>
            <div>
              <strong>Hostel:</strong> 1296
            </div>
            <div>
              <strong>School:</strong> 2640
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Info */}
      <Card className="col-span-1 md:col-span-2 shadow-xl rounded-2xl">
        <CardContent>
          <div className="text-sm mb-2">
            <p>
              <strong>Sri Raghavendra T, K.A.S</strong> – Director, Directorate
              of Minorities
            </p>
            <p>
              <strong>Smt. Kavitha E</strong> – Assistant Director, Admin,
              Minority Welfare Department
            </p>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            The Establishment department performs human resource management,
            overseeing various aspects of employment, such as compliance with
            labor law and employment standards, administration of employee
            benefits, organizing of employee files with the required documents
            for future reference and employee offboarding. We serve as the link
            between an organization's management and its employees.
          </p>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="col-span-1 md:col-span-1 shadow-xl rounded-2xl">
        <CardContent>
          <h3 className="text-center text-lg font-semibold mb-2">
            Post Distribution by District
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
