import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { MessageCircle, CheckCircle, Users, TrendingUp, Shield } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <Navbar />
      
      <div className="container py-12 max-w-5xl">
        {/* 品牌故事区域 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.jpg" 
              alt="小麒麟转租通" 
              className="w-32 h-32 rounded-full shadow-lg object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            小麒麟转租通
          </h1>
          <p className="text-xl text-orange-600 font-medium mb-2">
            专注留学生转租，为您的押金与租金保驾护航
          </p>
          <p className="text-gray-600">
            七年专业服务 · 已帮助数千位留学生成功转租
          </p>
        </div>

        {/* 品牌故事卡片 */}
        <Card className="p-8 mb-8 bg-white/80 backdrop-blur">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">关于我们的故事</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg">
              <span className="font-semibold text-orange-600">这不是一个突然出现的故事。</span>
            </p>
            <p>
              自<span className="font-semibold">2018年</span>起，我们便开始在美国东西海岸的留学生圈子里，默默做着一件简单却重要的小事：
              <span className="font-semibold text-orange-600">帮助那些因计划突变而不得不提前离开的同学，解决最棘手的转租难题。</span>
            </p>
            <p>
              七年间，我们已成功为<span className="font-semibold text-orange-600">数千位留学生</span>挽回了因空置房租带来的巨额损失。
              每一个成功转租的背后，都是一个可以安心毕业、无忧奔赴下一段旅程的同学。
            </p>
            <p className="text-lg font-medium text-gray-900">
              我们深知，您最需要的不是信息堆砌，而是一个<span className="text-orange-600">确定的结果</span>。
            </p>
          </div>
        </Card>

        {/* 服务亮点 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">全网曝光</h3>
                <p className="text-gray-600">覆盖主流平台的矩阵推广，让您的房源触达更多潜在租客</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">智能匹配</h3>
                <p className="text-gray-600">AI初筛结合人工精配，快速找到合适的租客</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">专属支持</h3>
                <p className="text-gray-600">专业顾问全流程支持，从发布到成交一站式服务</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">精准投放</h3>
                <p className="text-gray-600">直接送达潜在租客，提高转租成功率</p>
              </div>
            </div>
          </Card>
        </div>

        {/* 联系方式卡片 */}
        <Card className="p-10 bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">联系我们的专业顾问</h2>
          <p className="text-lg mb-8 text-white/90">
            扫描下方二维码添加客服微信，我们将为您提供专业的转租服务
          </p>
          
          {/* 微信二维码 */}
          <div className="bg-white rounded-2xl p-8 inline-block shadow-2xl">
            <img 
              src="/wechat-qr.jpg" 
              alt="小麒麟转租通微信二维码" 
              className="w-80 h-auto rounded-lg mx-auto"
            />
            <div className="mt-6 text-center">
              <p className="text-gray-900 font-bold text-xl mb-2">扫码添加客服微信</p>
              <p className="text-gray-600">微信号：<span className="font-mono font-semibold text-orange-600">qilinboston</span></p>
            </div>
          </div>

          <div className="mt-8 text-white/90">
            <p className="text-sm">工作时间：周一至周日 9:00-21:00（美东时间）</p>
            <p className="text-sm mt-1">我们将在24小时内回复您的咨询</p>
          </div>
        </Card>

        {/* 信任标识 */}
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center gap-8 text-gray-600">
            <div>
              <p className="text-3xl font-bold text-orange-600">7+</p>
              <p className="text-sm">年专业经验</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div>
              <p className="text-3xl font-bold text-orange-600">5000+</p>
              <p className="text-sm">成功案例</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div>
              <p className="text-3xl font-bold text-orange-600">98%</p>
              <p className="text-sm">客户满意度</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
