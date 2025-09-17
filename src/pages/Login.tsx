import { ChevronDownIcon, EyeIcon } from "lucide-react";
import React, { useState } from "react";
import { Button, Input, Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { Checkbox } from "@/shared/ui/checkbox";
import { useAuthStore } from "@/shared/store";
import { useToast } from "@/hooks/use-toast";

export const Login = (): JSX.Element => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 min-h-screen bg-[url(/figmaAssets/image-8.png)] bg-cover bg-center hidden md:block" />

        <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-8 min-h-screen">
          <div className="flex flex-col w-full max-w-[374px] items-start gap-5 py-8">
            <div className="inline-flex items-center gap-[15px] relative flex-[0_0_auto]">
              <img
                className="relative w-[42px] h-[42px]"
                alt="Logo"
                src="/figmaAssets/logo.png"
              />

              <div className="relative w-fit mt-[-1.00px] font-display-md-extrabold font-[number:var(--display-md-extrabold-font-weight)] text-[#0a0d12] text-[length:var(--display-md-extrabold-font-size)] tracking-[var(--display-md-extrabold-letter-spacing)] leading-[var(--display-md-extrabold-line-height)] whitespace-nowrap [font-style:var(--display-md-extrabold-font-style)]">
                Foody
              </div>
            </div>

            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative self-stretch mt-[-1.00px] font-display-sm-extrabold font-[number:var(--display-sm-extrabold-font-weight)] text-[#0a0d12] text-[length:var(--display-sm-extrabold-font-size)] tracking-[var(--display-sm-extrabold-letter-spacing)] leading-[var(--display-sm-extrabold-line-height)] [font-style:var(--display-sm-extrabold-font-style)]">
                Welcome Back
              </div>

              <div className="relative self-stretch font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-[#0a0d12] text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] [font-style:var(--text-md-medium-font-style)]">
                Good to see you again! Let&apos;s eat
              </div>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#f4f4f4] rounded-2xl p-2 h-auto">
                <TabsTrigger
                  value="signin"
                  className="h-10 bg-white rounded-xl shadow-shadow-card data-[state=active]:bg-white data-[state=active]:shadow-shadow-card data-[state=inactive]:bg-transparent data-[state=inactive]:shadow-none font-text-md-bold font-[number:var(--text-md-bold-font-weight)] text-[length:var(--text-md-bold-font-size)] tracking-[var(--text-md-bold-letter-spacing)] leading-[var(--text-md-bold-line-height)] [font-style:var(--text-md-bold-font-style)] text-[#0a0d12]"
                >
                  Sign in
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="h-10 bg-transparent rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-shadow-card data-[state=inactive]:bg-transparent data-[state=inactive]:shadow-none font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] [font-style:var(--text-md-medium-font-style)] text-[#535861]"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-5 space-y-5">
                <form onSubmit={handleLogin} className="flex flex-col items-start gap-5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-full">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                  </div>

                  <div className="relative w-full">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                    <EyeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#717680]" />
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                      className="w-5 h-5 rounded-md border border-solid border-[#d5d7da]"
                    />
                    <label
                      htmlFor="remember"
                      className="relative w-fit mt-[-1.00px] font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-[#0a0d12] text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] whitespace-nowrap [font-style:var(--text-md-medium-font-style)] cursor-pointer"
                    >
                      Remember Me
                    </label>
                  </div>
                </form>

                <Button 
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="h-12 w-full bg-[#c12116] hover:bg-[#a01e15] rounded-[100px] font-text-md-bold font-[number:var(--text-md-bold-font-weight)] text-[#fdfdfd] text-[length:var(--text-md-bold-font-size)] tracking-[var(--text-md-bold-letter-spacing)] leading-[var(--text-md-bold-line-height)] [font-style:var(--text-md-bold-font-style)] disabled:opacity-50"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="mt-5">
                <div className="text-center text-[#717680]">
                  Sign up form would go here
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
    </div>
  );
};
