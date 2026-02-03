import { useState } from "react";
import { useNavigate } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLogin() {
  const [, setLocation] = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单的密码验证（实际项目中应该使用后端验证）
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
    
    if (password === adminPassword) {
      // 保存登录状态到localStorage
      localStorage.setItem("adminLoggedIn", "true");
      setLocation("/admin/dashboard");
    } else {
      setError("密码错误，请重试");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">管理后台登录</CardTitle>
          <CardDescription>请输入管理员密码</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="输入密码"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full"
              />
              {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
            <p className="text-xs text-gray-500 text-center mt-4">
              默认密码：admin123（可在环境变量中修改）
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
