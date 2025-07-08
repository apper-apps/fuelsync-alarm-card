import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

const FormField = ({ label, error, required, className, ...inputProps }) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label required={required}>{label}</Label>
      <Input
        className={cn(
          error && "border-error focus:border-error focus:ring-error/30"
        )}
        {...inputProps}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;