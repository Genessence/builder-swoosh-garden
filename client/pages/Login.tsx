import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in real app would validate credentials
    if (username && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background with gradient and factory silhouette */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 400' opacity='0.1'%3E%3Cpath d='M0 300L50 280L100 290L150 270L200 280L250 260L300 270L350 250L400 260L450 240L500 250L550 230L600 240L650 220L700 230L750 210L800 220L850 200L900 210L950 190L1000 200V400H0V300Z' fill='%23001F3F'/%3E%3C/svg%3E")`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 relative z-10 shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-industrial-navy rounded-full flex items-center justify-center">
            <div className="text-white font-bold text-xl">CP</div>
          </div>
          <CardTitle className="text-2xl font-bold text-industrial-navy">
            Cylinder Inventory Portal
          </CardTitle>
          <p className="text-gray-600 text-sm">Manufacturing Operations Dashboard</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-industrial-navy hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-industrial-navy hover:bg-industrial-navy/90 text-white py-2.5"
              size="lg"
            >
              Login
            </Button>
          </form>
          
          <div className="text-center text-xs text-gray-500 pt-4">
            © 2024 Manufacturing Operations Portal
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
