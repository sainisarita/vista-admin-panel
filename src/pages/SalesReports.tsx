
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ChartContainer from "../components/dashboard/ChartContainer";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { 
  monthlySalesData, 
  salesByCategoryData,
  salesData
} from "../data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DataTable from "../components/tables/DataTable";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, Calendar as CalendarIcon } from "lucide-react";
import { format as formatDate, subMonths } from "date-fns";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

const SalesReports = () => {
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });
  
  const columns = [
    {
      id: "service",
      header: "Service",
      cell: (row: any) => <span className="font-medium">{row.service}</span>,
      sortable: true
    },
    {
      id: "customer",
      header: "Customer",
      cell: (row: any) => row.customer,
      sortable: true
    },
    {
      id: "category",
      header: "Category",
      cell: (row: any) => row.category,
      sortable: true
    },
    {
      id: "date",
      header: "Date",
      cell: (row: any) => format(new Date(row.date), "MMM dd, yyyy"),
      sortable: true
    },
    {
      id: "amount",
      header: "Amount",
      cell: (row: any) => `$${row.amount.toLocaleString()}`,
      sortable: true
    }
  ];

  const formatDateRange = (dateObject: {from: Date, to: Date} | undefined) => {
    if (!dateObject?.from) return "Select date range";
    if (!dateObject?.to) return formatDate(dateObject.from, "LLL dd, y");
    return `${formatDate(dateObject.from, "LLL dd, y")} - ${formatDate(dateObject.to, "LLL dd, y")}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Sales Reports</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{formatDateRange(date)}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                selected={date}
                onSelect={(selected) => {
                  if (selected?.from && selected?.to) {
                    setDate(selected);
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" className="gap-2">
            <ArrowDownToLine className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full md:w-auto grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer 
              title="Monthly Sales" 
              action={
                <Select defaultValue="year">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              }
            >
              <div className="chart-container p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Sales']}
                    />
                    <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
            
            <ChartContainer title="Sales by Category">
              <div className="chart-container p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {salesByCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Recent Sales</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={salesData}
                  searchable={false}
                  pageSize={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer 
              title="Monthly Sales Trend" 
              action={
                <Select defaultValue="year">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              }
            >
              <div className="chart-container p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
            
            <ChartContainer 
              title="Sales by Category" 
              action={
                <Select defaultValue="pie">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Chart Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                  </SelectContent>
                </Select>
              }
            >
              <div className="chart-container p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {salesByCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
            
            <ChartContainer 
              title="Sales Comparison"
              className="col-span-1 lg:col-span-2"
              action={
                <Select defaultValue="month">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Monthly</SelectItem>
                    <SelectItem value="quarter">Quarterly</SelectItem>
                    <SelectItem value="year">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              }
            >
              <div className="chart-container p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlySalesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" name="Current Year" fill="#8884d8" />
                    <Bar dataKey="previousYear" name="Previous Year" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <DataTable
                  columns={columns}
                  data={salesData}
                  searchPlaceholder="Search transactions..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesReports;
