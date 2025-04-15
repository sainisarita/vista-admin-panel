
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextField } from "../components/forms/FormFields";
import DataTable from "../components/tables/DataTable";
import { usersData } from "../data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import ConfirmDialog from "../components/modals/ConfirmDialog";
import { toast } from "sonner";

const Users = () => {
  const [users, setUsers] = useState([...usersData]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleEdit = (user: any) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setOpenEditDialog(true);
  };

  const handleDelete = (user: any) => {
    setCurrentUser(user);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (!currentUser) return;
    
    setUsers(prev => prev.filter(user => user.id !== currentUser.id));
    toast.success("User deleted successfully");
    setOpenDeleteDialog(false);
  };

  const saveUserChanges = () => {
    if (!currentUser) return;
    
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id ? { ...user, ...formData } : user
    ));
    
    toast.success("User updated successfully");
    setOpenEditDialog(false);
  };

  const columns = [
    {
      id: "name",
      header: "Name",
      cell: (row: any) => (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={row.avatar} alt={row.name} />
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{row.name}</span>
        </div>
      ),
      sortable: true
    },
    {
      id: "email",
      header: "Email",
      cell: (row: any) => row.email,
      sortable: true
    },
    {
      id: "role",
      header: "Role",
      cell: (row: any) => row.role,
      sortable: true
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
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>

      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search users..."
        addButtonText="Add User"
        onAddNew={() => {
          setCurrentUser(null);
          setFormData({
            name: "",
            email: "",
            role: "User"
          });
          setOpenEditDialog(true);
        }}
      />

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentUser ? "Edit User" : "Add User"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <TextField
              label="Name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
            <TextField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            
            <TextField
              label="Role"
              id="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpenEditDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveUserChanges}>
              {currentUser ? "Save Changes" : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        title="Delete User"
        description={`Are you sure you want to delete ${currentUser?.name}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default Users;
