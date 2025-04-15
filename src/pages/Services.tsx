
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField, TextareaField, ImageUploadField } from "../components/forms/FormFields";
import DataTable from "../components/tables/DataTable";
import { servicesData, categoriesData } from "../data/mockData";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import ConfirmDialog from "../components/modals/ConfirmDialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Services = () => {
  const [services, setServices] = useState([...servicesData]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    categories: [] as string[]
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (value: string) => {
    const currentCategories = [...formData.categories];
    if (currentCategories.includes(value)) {
      setFormData(prev => ({
        ...prev,
        categories: currentCategories.filter(cat => cat !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        categories: [...currentCategories, value]
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // Here we're just creating a URL for preview
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleEdit = (service: any) => {
    setCurrentService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image,
      categories: service.categories
    });
    setOpenEditDialog(true);
  };

  const handleDelete = (service: any) => {
    setCurrentService(service);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!currentService) return;
    
    setServices(prev => prev.filter(service => service.id !== currentService.id));
    toast.success("Service deleted successfully");
    setOpenDeleteDialog(false);
  };

  const saveServiceChanges = () => {
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (currentService) {
      // Update existing service
      setServices(prev => prev.map(service => 
        service.id === currentService.id ? 
        { 
          ...service, 
          title: formData.title,
          description: formData.description,
          image: formData.image || service.image,
          categories: formData.categories
        } : service
      ));
      
      toast.success("Service updated successfully");
    } else {
      // Add new service
      const newService = {
        id: `${services.length + 1}`,
        title: formData.title,
        description: formData.description,
        image: formData.image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop",
        createdAt: new Date().toISOString(),
        categories: formData.categories
      };
      
      setServices(prev => [newService, ...prev]);
      toast.success("Service added successfully");
    }
    
    setOpenEditDialog(false);
  };

  const columns = [
    {
      id: "service",
      header: "Service",
      cell: (row: any) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
            <img
              src={row.image}
              alt={row.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.title}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {row.categories.map((category: string) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "description",
      header: "Description",
      cell: (row: any) => (
        <div className="max-w-sm truncate">{row.description}</div>
      )
    },
    {
      id: "createdAt",
      header: "Created Date",
      cell: (row: any) => format(new Date(row.createdAt), "MMM dd, yyyy"),
      sortable: true
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(row)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
          >
            <a href={row.image} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services Management</h1>
      </div>

      <DataTable
        columns={columns}
        data={services}
        searchPlaceholder="Search services..."
        addButtonText="Add Service"
        onAddNew={() => {
          setCurrentService(null);
          setFormData({
            title: "",
            description: "",
            image: "",
            categories: []
          });
          setOpenEditDialog(true);
        }}
      />

      {/* Edit Service Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{currentService ? "Edit Service" : "Add Service"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <TextField
              label="Title"
              id="title"
              value={formData.title}
              onChange={handleTextChange}
              required
            />
            
            <TextareaField
              label="Description"
              id="description"
              value={formData.description}
              onChange={handleTextChange}
              required
              rows={5}
            />
            
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2">
                {categoriesData.map(category => (
                  <Badge 
                    key={category.id}
                    variant={formData.categories.includes(category.name) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            <ImageUploadField
              label="Image"
              id="image"
              onChange={handleImageChange}
              preview={formData.image}
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenEditDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveServiceChanges}>
              {currentService ? "Save Changes" : "Add Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Delete Service"
        description={`Are you sure you want to delete "${currentService?.title}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default Services;
