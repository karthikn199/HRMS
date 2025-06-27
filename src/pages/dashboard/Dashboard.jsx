import { YearlyPostChart } from "./BarChart";
import { DepartmentLeadership } from "./Department";
import { DepartmentDescription } from "./DepartmentDesc";
import { GenderStats } from "./Gender";
import { DistrictPieChart } from "./Piechart";
import { PostStats } from "./Post";
import { YearlyData } from "./YearlyData";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 mt-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Minority Welfare Department Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <GenderStats />
            <DistrictPieChart />
<YearlyPostChart />
            {/* <YearlyData /> */}
          </div>

          <div>
            {/* <DepartmentLeadership /> */}
            <PostStats />
            <DepartmentLeadership />
            <DepartmentDescription />
          </div>
        </div>
      </div>
    </div>
  );
};
