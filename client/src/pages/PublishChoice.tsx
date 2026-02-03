import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search } from "lucide-react";

export default function PublishChoice() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">选择发布类型</h1>
            <p className="text-muted-foreground text-lg">
              请选择您要发布的信息类型
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/publish/listing">
              <Card className="cursor-pointer hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-primary">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Home className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">发布转租房源</CardTitle>
                  <CardDescription className="text-base">
                    假期回家，对房源不满意但无法退款？尝试转租服务将它转给有缘人
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 填写房源详细信息</li>
                    <li>• 上传房源图片</li>
                    <li>• 设置租金和入住时间</li>
                    <li>• 等待租客联系</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/publish/request">
              <Card className="cursor-pointer hover:shadow-xl transition-all hover:scale-105 border-2 hover:border-primary">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">发布求租信息</CardTitle>
                  <CardDescription className="text-base">
                    何必苦苦寻找合适房源，发布求租信息，让理想的房子自己来找你
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 描述您的租房需求</li>
                    <li>• 设置预算和期望房型</li>
                    <li>• 选择入住时间</li>
                    <li>• 等待房东联系</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
