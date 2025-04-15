
import { 
  Users, 
  ShoppingBag, 
  ListFilter, 
  MessageSquareQuote, 
  ShoppingCart 
} from "lucide-react";

// Stats data for dashboard
export const statsData = [
  {
    id: 1,
    title: "Total Users",
    value: 1295,
    icon: Users,
    color: "bg-blue-500",
    change: "+12.5%",
    trend: "up"
  },
  {
    id: 2,
    title: "Total Services",
    value: 83,
    icon: ShoppingBag,
    color: "bg-purple-500",
    change: "+5.2%",
    trend: "up"
  },
  {
    id: 3,
    title: "Total Categories",
    value: 16,
    icon: ListFilter,
    color: "bg-amber-500",
    change: "+0%",
    trend: "neutral"
  },
  {
    id: 4,
    title: "Total Testimonials",
    value: 342,
    icon: MessageSquareQuote,
    color: "bg-green-500",
    change: "+18.7%",
    trend: "up"
  },
  {
    id: 5,
    title: "Total Sales",
    value: "$85,240",
    icon: ShoppingCart,
    color: "bg-red-500",
    change: "+7.3%",
    trend: "up"
  }
];

// Chart data for monthly sales
export const monthlySalesData = [
  { name: "Jan", sales: 5000 },
  { name: "Feb", sales: 7000 },
  { name: "Mar", sales: 10000 },
  { name: "Apr", sales: 8000 },
  { name: "May", sales: 12000 },
  { name: "Jun", sales: 16000 },
  { name: "Jul", sales: 14000 },
  { name: "Aug", sales: 18000 },
  { name: "Sep", sales: 20000 },
  { name: "Oct", sales: 17000 },
  { name: "Nov", sales: 22000 },
  { name: "Dec", sales: 25000 }
];

// Chart data for user growth
export const userGrowthData = [
  { name: "Jan", users: 700 },
  { name: "Feb", users: 800 },
  { name: "Mar", users: 850 },
  { name: "Apr", users: 900 },
  { name: "May", users: 950 },
  { name: "Jun", users: 1000 },
  { name: "Jul", users: 1050 },
  { name: "Aug", users: 1150 },
  { name: "Sep", users: 1200 },
  { name: "Oct", users: 1250 },
  { name: "Nov", users: 1275 },
  { name: "Dec", users: 1295 }
];

// Users data
export const usersData = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    createdAt: "2023-01-15T10:00:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    createdAt: "2023-02-20T14:30:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "User",
    createdAt: "2023-03-05T09:15:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "User",
    createdAt: "2023-03-12T11:45:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Editor",
    createdAt: "2023-04-02T16:20:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "User",
    createdAt: "2023-04-18T13:10:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  }
];

// Services data
export const servicesData = [
  {
    id: "1",
    title: "Website Development",
    description: "Professional website development services using the latest technologies.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
    createdAt: "2023-01-10T09:00:00Z",
    categories: ["Development"]
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Custom mobile application development for iOS and Android platforms.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
    createdAt: "2023-01-15T11:30:00Z",
    categories: ["Development", "Mobile"]
  },
  {
    id: "3",
    title: "UI/UX Design",
    description: "User interface and experience design services for digital products.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    createdAt: "2023-02-05T14:45:00Z",
    categories: ["Design"]
  },
  {
    id: "4",
    title: "SEO Optimization",
    description: "Search engine optimization services to improve website visibility.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop",
    createdAt: "2023-02-20T10:15:00Z",
    categories: ["Marketing"]
  },
  {
    id: "5",
    title: "Content Writing",
    description: "Professional content creation for websites, blogs, and social media.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop",
    createdAt: "2023-03-12T13:20:00Z",
    categories: ["Content", "Marketing"]
  }
];

// Categories data
export const categoriesData = [
  {
    id: "1",
    name: "Development",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
    servicesCount: 25
  },
  {
    id: "2",
    name: "Design",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop",
    servicesCount: 18
  },
  {
    id: "3",
    name: "Marketing",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop",
    servicesCount: 15
  },
  {
    id: "4",
    name: "Content",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
    servicesCount: 12
  },
  {
    id: "5",
    name: "Mobile",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
    servicesCount: 13
  }
];

// Testimonials data
export const testimonialsData = [
  {
    id: "1",
    name: "Alice Johnson",
    message: "The services provided were exceptional. The team was professional and delivered beyond our expectations.",
    rating: 5,
    date: "2023-02-15T10:30:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "2",
    name: "David Wilson",
    message: "Great experience working with this company. They understood our requirements perfectly and delivered on time.",
    rating: 4,
    date: "2023-03-20T14:45:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "3",
    name: "Sophie Martinez",
    message: "The design work was creative and innovative. We're very satisfied with the results.",
    rating: 5,
    date: "2023-04-05T11:15:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "4",
    name: "James Cooper",
    message: "Excellent service and support. The team was responsive and addressed all our concerns promptly.",
    rating: 4,
    date: "2023-05-10T09:20:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  },
  {
    id: "5",
    name: "Emma Phillips",
    message: "The mobile app developed by the team has significantly improved our customer engagement. Highly recommended!",
    rating: 5,
    date: "2023-06-18T15:30:00Z",
    avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
  }
];

// Sales data
export const salesData = [
  {
    id: "1",
    service: "Website Development",
    amount: 4500,
    date: "2023-01-15T10:00:00Z",
    customer: "Tech Solutions Inc.",
    category: "Development"
  },
  {
    id: "2",
    service: "Mobile App Development",
    amount: 8000,
    date: "2023-02-20T14:30:00Z",
    customer: "Innovate Media",
    category: "Development"
  },
  {
    id: "3",
    service: "UI/UX Design",
    amount: 3000,
    date: "2023-03-05T09:15:00Z",
    customer: "Creative Designs Ltd.",
    category: "Design"
  },
  {
    id: "4",
    service: "SEO Optimization",
    amount: 1500,
    date: "2023-04-12T11:45:00Z",
    customer: "Global Marketing",
    category: "Marketing"
  },
  {
    id: "5",
    service: "Content Writing",
    amount: 1200,
    date: "2023-05-22T16:20:00Z",
    customer: "Content Kings",
    category: "Content"
  }
];

// Sales by category data for pie chart
export const salesByCategoryData = [
  { name: "Development", value: 45000 },
  { name: "Design", value: 25000 },
  { name: "Marketing", value: 15000 },
  { name: "Content", value: 10000 },
  { name: "Mobile", value: 20000 }
];

// Recent transactions for dashboard
export const recentTransactionsData = [
  {
    id: "1",
    service: "Website Development",
    amount: 4500,
    date: "2023-06-28T10:00:00Z",
    customer: "Tech Solutions Inc.",
    status: "Completed"
  },
  {
    id: "2",
    service: "Mobile App Development",
    amount: 8000,
    date: "2023-06-25T14:30:00Z",
    customer: "Innovate Media",
    status: "Completed"
  },
  {
    id: "3",
    service: "UI/UX Design",
    amount: 3000,
    date: "2023-06-22T09:15:00Z",
    customer: "Creative Designs Ltd.",
    status: "Processing"
  },
  {
    id: "4",
    service: "SEO Optimization",
    amount: 1500,
    date: "2023-06-20T11:45:00Z",
    customer: "Global Marketing",
    status: "Completed"
  }
];
