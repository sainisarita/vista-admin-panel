
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField, ImageUploadField } from "../components/forms/FormFields";
import DataTable from "../components/tables/DataTable";
import { categoriesData } from "../data/mockData";
import { Edit, Trash2 } from "lucide-react";
import ConfirmDialog from "../components/modals/ConfirmDialog";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const Categories = () => {
  const [categories, setCategories] = useState([...categoriesData]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: ""
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
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

  const handleEdit = (category: any) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      image: category.image
    });
    setOpenEditDialog(true);
  };

  const handleDelete = (category: any) => {
    setCurrentCategory(category);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!currentCategory) return;
    
    setCategories(prev => prev.filter(category => category.id !== currentCategory.id));
    toast.success("Category deleted successfully");
    setOpenDeleteDialog(false);
  };

  const saveCategoryChanges = () => {
    if (!formData.name) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (currentCategory) {
      // Update existing category
      setCategories(prev => prev.map(category => 
        category.id === currentCategory.id ? 
        { 
          ...category, 
          name: formData.name,
          image: formData.image || category.image
        } : category
      ));
      
      toast.success("Category updated successfully");
    } else {
      // Add new category
      const newCategory = {
        id: `${categories.length + 1}`,
        name: formData.name,
        image: formData.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop",
        servicesCount: 0
      };
      
      setCategories(prev => [newCategory, ...prev]);
      toast.success("Category added successfully");
    }
    
    setOpenEditDialog(false);
  };

  const columns = [
    {
      id: "category",
      header: "Category",
      cell: (row: any) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
            <img
              src={row.image}
              alt={row.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="font-medium">{row.name}</div>
        </div>
      )
    },
    {
      id: "servicesCount",
      header: "Services Count",
      cell: (row: any) => row.servicesCount,
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
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories Management</h1>
      </div>

      {/* Card view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(category => (
          <Card key={category.id} className="overflow-hidden">
            <div className="h-40 w-full">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.servicesCount} services</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(category)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border-dashed cursor-pointer hover:bg-gray-50 transition-colors h-full flex items-center justify-center"
          onClick={() => {
            setCurrentCategory(null);
            setFormData({
              name: "",
              image: ""
            });
            setOpenEditDialog(true);
          }}
        >
          <CardContent className="p-4 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <p className="font-medium">Add New Category</p>
          </CardContent>
        </Card>
      </div>

      {/* Table view */}
      <DataTable
        columns={columns}
        data={categories}
        searchPlaceholder="Search categories..."
        addButtonText="Add Category"
        onAddNew={() => {
          setCurrentCategory(null);
          setFormData({
            name: "",
            image: ""
          });
          setOpenEditDialog(true);
        }}
      />

      {/* Edit Category Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCategory ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <TextField
              label="Name"
              id="name"
              value={formData.name}
              onChange={handleTextChange}
              required
            />
            
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
            <Button onClick={saveCategoryChanges}>
              {currentCategory ? "Save Changes" : "Add Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Delete Category"
        description={`Are you sure you want to delete "${currentCategory?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default Categories;
