"use client"
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button  disabled={pending}>
      {pending ? "Submitting..." : "Click"}
    </button>
  );
};

export default SubmitBtn;
