import { useEffect } from "react";
import { useNavigate, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Home } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useNavigate();

  useEffect(() => {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">管理后台</h1>
            <div className="flex gap-2">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>欢迎使用小麒麟管理后台</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              管理后台功能正在开发中。您可以通过这里管理网站的房源信息。
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">房源管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">查看和管理所有房源信息</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">用户管理</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">管理注册用户和权限</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">数据统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">查看网站访问和使用数据</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
