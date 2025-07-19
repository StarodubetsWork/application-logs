import { useForm } from "react-hook-form";
import { useEffect, type FC } from "react";
import type { ILog, ILogFormData } from "@interfaces";
import { Button, Input, TextArea } from "@components";
import { texts } from "@config";

interface ILogFormProps {
  onSubmit: (data: ILogFormData) => void;
  initialData?: Pick<ILog, "owner" | "text"> | null;
  isSubmitting?: boolean;
  submitButtonText?: string;
  onCancel: () => void;
}

const LogForm: FC<ILogFormProps> = ({
  onSubmit,
  initialData,
  isSubmitting = false,
  submitButtonText = "Submit",
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ILogFormData>({
    defaultValues: {
      owner: "",
      text: "",
    },
  });

  // Set form values when initialData changes
  useEffect(() => {
    if (initialData) {
      setValue("owner", initialData.owner);
      setValue("text", initialData.text);
    } else {
      reset();
    }
  }, [initialData, setValue, reset]);

  const onFormSubmit = async (data: ILogFormData) => {
    await onSubmit(data);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        label={texts.forms.logForm.ownerLabel}
        placeholder={texts.forms.logForm.ownerPlaceholder}
        autoFocus
        error={errors.owner?.message}
        {...register("owner", {
          required: texts.forms.logForm.validation.ownerRequired,
          minLength: {
            value: 2,
            message: texts.forms.logForm.validation.ownerMinLength,
          },
        })}
      />

      <TextArea
        label={texts.forms.logForm.textLabel}
        placeholder={texts.forms.logForm.textPlaceholder}
        rows={4}
        error={errors.text?.message}
        {...register("text", {
          required: texts.forms.logForm.validation.textRequired,
          minLength: {
            value: 5,
            message: texts.forms.logForm.validation.textMinLength,
          },
        })}
      />

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button variant="secondary" onClick={handleCancel}>
          {texts.forms.logForm.cancelButton}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingText={texts.loading.submitting}
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default LogForm;
