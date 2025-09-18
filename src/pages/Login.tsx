import { ChevronDownIcon, EyeIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button, Input, Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";
import { Checkbox } from "@/shared/ui/checkbox";
import { useAuthStore } from "@/shared/store";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export const Login = (): JSX.Element => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Sign up form states
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Get tab from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const tabFromUrl = urlParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl === 'signup' ? 'signup' : 'signin');

  // Redirect to home if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  // Update URL when tab changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', activeTab);
    window.history.replaceState({}, '', url.toString());
  }, [activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      // Redirect to home page after successful login
      setLocation("/");
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignUpLoading(true);
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsSignUpLoading(false);
      return;
    }
    
    try {
      // TODO: Implement sign up logic
      console.log({ name, email, phoneNumber, password, confirmPassword });
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSignUpLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/2 min-h-screen bg-[url(/figmaAssets/image-8.png)] bg-cover bg-center hidden md:block" />

        <div className="w-full md:w-1/2 flex items-start md:items-center justify-center px-6 md:px-8 h-screen overflow-y-auto">
          <div className="flex flex-col w-full max-w-[345px] md:max-w-[374px] items-start gap-4 md:gap-5 py-4 md:py-8 mt-16 md:mt-0">
            <div className="inline-flex items-center gap-3 md:gap-[15px] relative flex-[0_0_auto]">
              <img
                className="relative w-8 h-8 md:w-[42px] md:h-[42px]"
                alt="Logo"
                src="/figmaAssets/logo.png"
              />

              <div className="relative w-fit mt-[-1.00px] font-display-md-extrabold font-[number:var(--display-md-extrabold-font-weight)] text-[#0a0d12] text-xl md:text-[length:var(--display-md-extrabold-font-size)] tracking-[var(--display-md-extrabold-letter-spacing)] leading-[var(--display-md-extrabold-line-height)] whitespace-nowrap [font-style:var(--display-md-extrabold-font-style)]">
                Foody
              </div>
            </div>

            <div className="flex flex-col items-start gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative self-stretch mt-[-1.00px] font-display-sm-extrabold font-[number:var(--display-sm-extrabold-font-weight)] text-[#0a0d12] text-xl md:text-[length:var(--display-sm-extrabold-font-size)] tracking-[var(--display-sm-extrabold-letter-spacing)] leading-[var(--display-sm-extrabold-line-height)] [font-style:var(--display-sm-extrabold-font-style)]">
                Welcome Back
              </div>

              <div className="relative self-stretch font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-[#0a0d12] text-sm md:text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] [font-style:var(--text-md-medium-font-style)]">
                Good to see you again! Let&apos;s eat
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#f5f5f5] rounded-2xl p-2 h-auto">
                <TabsTrigger
                  value="signin"
                  className="h-9 md:h-10 bg-transparent rounded-lg md:rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-shadow-card data-[state=inactive]:bg-transparent data-[state=inactive]:shadow-none data-[state=active]:font-text-md-bold data-[state=inactive]:font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-sm md:text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] [font-style:var(--text-md-medium-font-style)] data-[state=active]:text-[#0a0d12] data-[state=inactive]:text-[#535862]"
                >
                  Sign in
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="h-9 md:h-10 bg-transparent rounded-lg md:rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-shadow-card data-[state=inactive]:bg-transparent data-[state=inactive]:shadow-none data-[state=active]:font-text-md-bold data-[state=inactive]:font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-sm md:text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] [font-style:var(--text-md-medium-font-style)] data-[state=active]:text-[#0a0d12] data-[state=inactive]:text-[#535862]"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-4 md:mt-5 space-y-4 md:space-y-5">
                <form onSubmit={handleLogin} className="flex flex-col items-start gap-4 md:gap-5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-full">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 md:h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-sm md:text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                  </div>

                  <div className="relative w-full">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 md:h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-sm md:text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                    <EyeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#717680]" />
                  </div>

                  <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked === true)}
                      className="w-4 h-4 md:w-5 md:h-5 rounded-md border border-solid border-[#d5d7da]"
                    />
                    <label
                      htmlFor="remember"
                      className="relative w-fit mt-[-1.00px] font-text-md-medium font-[number:var(--text-md-medium-font-weight)] text-[#0a0d12] text-sm md:text-[length:var(--text-md-medium-font-size)] tracking-[var(--text-md-medium-letter-spacing)] leading-[var(--text-md-medium-line-height)] whitespace-nowrap [font-style:var(--text-md-medium-font-style)] cursor-pointer"
                    >
                      Remember Me
                    </label>
                  </div>
                </form>

                <Button 
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="h-10 md:h-12 w-full bg-[#c12116] hover:bg-[#a01e15] rounded-[100px] font-text-md-bold font-[number:var(--text-md-bold-font-weight)] text-[#fdfdfd] text-sm md:text-[length:var(--text-md-bold-font-size)] tracking-[var(--text-md-bold-letter-spacing)] leading-[var(--text-md-bold-line-height)] [font-style:var(--text-md-bold-font-style)] disabled:opacity-50"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="mt-4 md:mt-5 space-y-4 md:space-y-5">
                <form onSubmit={handleSignUp} className="flex flex-col items-start gap-4 md:gap-5 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="relative w-full">
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 md:h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-sm md:text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                  </div>

                  <div className="relative w-full">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 md:h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-sm md:text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                  </div>

                  <div className="relative w-full">
                    <Input
                      type="tel"
                      placeholder="Number Phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="h-12 md:h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-sm md:text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                  </div>

                  <div className="relative w-full">
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 md:h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-sm md:text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                    <EyeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#717680]" />
                  </div>

                  <div className="relative w-full">
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12 md:h-14 px-3 py-2 rounded-xl border border-solid border-[#d5d7da] font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-sm md:text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] placeholder:text-[#717680]"
                    />
                    <EyeIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#717680]" />
                  </div>
                </form>

                <Button 
                  onClick={handleSignUp}
                  disabled={isSignUpLoading}
                  className="h-10 md:h-12 w-full bg-[#c12116] hover:bg-[#a01e15] rounded-[100px] font-text-md-bold font-[number:var(--text-md-bold-font-weight)] text-[#fdfdfd] text-sm md:text-[length:var(--text-md-bold-font-size)] tracking-[var(--text-md-bold-letter-spacing)] leading-[var(--text-md-bold-line-height)] [font-style:var(--text-md-bold-font-style)] disabled:opacity-50"
                >
                  {isSignUpLoading ? "Creating account..." : "Register"}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
    </div>
  );
};
