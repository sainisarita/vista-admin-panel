
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

interface TextareaFieldProps {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
  className?: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  rows = 4,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

interface ImageUploadFieldProps {
  label: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  id,
  onChange,
  preview,
  required = false,
  error,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="grid gap-4">
        {preview && (
          <div className="relative w-40 h-40 rounded-md overflow-hidden border border-gray-200">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <Input
          id={id}
          type="file"
          onChange={onChange}
          required={required}
          accept="image/*"
          className={error ? "border-red-500" : ""}
        />
      </div>
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
