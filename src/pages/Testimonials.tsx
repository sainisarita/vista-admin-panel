
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField, TextareaField } from "../components/forms/FormFields";
import DataTable from "../components/tables/DataTable";
import { testimonialsData } from "../data/mockData";
import { Edit, Trash2, Star, StarHalf } from "lucide-react";
import { format } from "date-fns";
import ConfirmDialog from "../components/modals/ConfirmDialog";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([...testimonialsData]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleEdit = (testimonial: any) => {
    setCurrentTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      message: testimonial.message,
      rating: testimonial.rating
    });
    setOpenEditDialog(true);
  };

  const handleDelete = (testimonial: any) => {
    setCurrentTestimonial(testimonial);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!currentTestimonial) return;
    
    setTestimonials(prev => prev.filter(testimonial => testimonial.id !== currentTestimonial.id));
    toast.success("Testimonial deleted successfully");
    setOpenDeleteDialog(false);
  };

  const saveTestimonialChanges = () => {
    if (!formData.name || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (currentTestimonial) {
      // Update existing testimonial
      setTestimonials(prev => prev.map(testimonial => 
        testimonial.id === currentTestimonial.id ? 
        { 
          ...testimonial, 
          name: formData.name,
          message: formData.message,
          rating: formData.rating
        } : testimonial
      ));
      
      toast.success("Testimonial updated successfully");
    } else {
      // Add new testimonial
      const newTestimonial = {
        id: `${testimonials.length + 1}`,
        name: formData.name,
        message: formData.message,
        rating: formData.rating,
        date: new Date().toISOString(),
        avatar: "/lovable-uploads/b0178f35-a5cf-4a05-9630-ef6b94e48d36.png"
      };
      
      setTestimonials(prev => [newTestimonial, ...prev]);
      toast.success("Testimonial added successfully");
    }
    
    setOpenEditDialog(false);
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="text-yellow-400">
            {i < Math.floor(rating) ? (
              <Star className="fill-current h-4 w-4" />
            ) : i < rating ? (
              <StarHalf className="fill-current h-4 w-4" />
            ) : (
              <Star className="h-4 w-4" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const columns = [
    {
      id: "customer",
      header: "Customer",
      cell: (row: any) => (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={row.avatar} alt={row.name} />
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{row.name}</span>
        </div>
      )
    },
    {
      id: "message",
      header: "Message",
      cell: (row: any) => (
        <div className="max-w-sm truncate">{row.message}</div>
      )
    },
    {
      id: "rating",
      header: "Rating",
      cell: (row: any) => renderRating(row.rating),
      sortable: true
    },
    {
      id: "date",
      header: "Date",
      cell: (row: any) => format(new Date(row.date), "MMM dd, yyyy"),
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
        <h1 className="text-2xl font-bold">Testimonials Management</h1>
      </div>

      {/* Card view of testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map(testimonial => (
          <Card key={testimonial.id} className="relative">
            <CardContent className="p-6">
              <div className="absolute top-4 right-4 flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(testimonial)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDelete(testimonial)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(testimonial.date), "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              
              <div className="mb-3">
                {renderRating(testimonial.rating)}
              </div>
              
              <p className="text-gray-700">{testimonial.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table view */}
      <DataTable
        columns={columns}
        data={testimonials}
        searchPlaceholder="Search testimonials..."
        addButtonText="Add Testimonial"
        onAddNew={() => {
          setCurrentTestimonial(null);
          setFormData({
            name: "",
            message: "",
            rating: 5
          });
          setOpenEditDialog(true);
        }}
      />

      {/* Edit Testimonial Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentTestimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <TextField
              label="Customer Name"
              id="name"
              value={formData.name}
              onChange={handleTextChange}
              required
            />
            
            <TextareaField
              label="Message"
              id="message"
              value={formData.message}
              onChange={handleTextChange}
              required
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingChange(rating)}
                    className="text-yellow-400 p-1"
                  >
                    <Star 
                      className={`h-6 w-6 ${rating <= formData.rating ? "fill-current" : ""}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenEditDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveTestimonialChanges}>
              {currentTestimonial ? "Save Changes" : "Add Testimonial"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Delete Testimonial"
        description={`Are you sure you want to delete the testimonial from ${currentTestimonial?.name}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default Testimonials;
