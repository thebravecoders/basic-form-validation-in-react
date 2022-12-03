import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Full name is required field"),
  email: z
    .string()
    .min(1, "Email name is required field")
    .email("This email is not valid"),
  gender: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      gender: "female",
    },
    resolver: zodResolver(formSchema),
  });

  const onFormSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="container" onSubmit={handleSubmit(onFormSubmit)}>
      <form>
        <div className="group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="input"
            id="name"
            {...register("name")}
          />
          <p className="error-message">{errors?.name?.message}</p>
        </div>

        <div className="group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="input"
            id="email"
            {...register("email")}
          />
          <p className="error-message">{errors?.email?.message}</p>
        </div>

        <div className="group">
          <label htmlFor="gender">Gender</label>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                className="input"
                id="male"
                value="male"
                {...register("gender")}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                className="input"
                id="female"
                value="female"
                {...register("gender")}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
