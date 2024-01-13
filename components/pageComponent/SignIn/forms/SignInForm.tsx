"use client";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { POSTBulkInsertUser } from "@/services/user/api";
import { AuthError } from "next-auth";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const SignInForm = () => {
  const { pending } = useFormStatus();
  const [errorMessage, dispatch] = useFormState(
    async (prevState: string | undefined, formData: FormData) => {
      try {
        await signIn("credentials", formData);
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return "Invalid credentials.";
            default:
              return "Something went wrong.";
          }
        }
        throw error;
      }
    },
    undefined
  );

  return (
    <Card className="lg:min-w-96 xl:min-w-96">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription
          onClick={async () => {
            let fetching = POSTBulkInsertUser();

            toast.promise(fetching, {
              loading: "Uploading user...",
              success: () => {
                return "Success!";
              },
              error: () => {
                return "Something went wrong.";
              },
            });
          }}
        >
          Pena Kertas Project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch}>
          {/* USERNAME OR EMAIL */}
          <div className="mb-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              type="text"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="password"
              type="password"
            />
          </div>

          {/* SUBMIT */}
          <div>
            <Button className="w-full" aria-disabled={pending} type="submit">
              Log In
            </Button>
          </div>
          {/* <div>
            <Button
              type="button"
              onClick={async () => {
                let fetching = POSTBulkInsertUser();

                toast.promise(fetching, {
                  loading: "Uploading user...",
                  success: () => {
                    return "Success!";
                  },
                  error: () => {
                    return "Something went wrong.";
                  },
                });
              }}
            >
              BULK INSERT
            </Button>
          </div> */}
        </form>
        {errorMessage && (
          <span className="text-sm text-red-500">{errorMessage}</span>
        )}
      </CardContent>
    </Card>
  );
};

export default SignInForm;
