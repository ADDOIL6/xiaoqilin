import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Download, ArrowLeft } from "lucide-react";

interface PremiumContactCardProps {
  formData?: any;
  onBack?: () => void;
}

export default function PremiumContactCard({ formData, onBack }: PremiumContactCardProps) {
  const [copied, setCopied] = useState(false);
  const wechatId = "qilinboston";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // 生成长图并下载
  const handleDownloadPoster = async () => {
    if (!formData) {
      alert("暂无表单数据可生成长图");
      return;
    }

    // 创建canvas生成长图
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸（手机屏幕比例）
    canvas.width = 750;
    let canvasHeight = 1400;
    
    // 根据内容动态调整高度
    const hasImages = formData.images && formData.images.length > 0;
    if (hasImages) {
      canvasHeight += Math.ceil(formData.images.length / 2) * 300;
    }
    canvas.height = canvasHeight;

    // 绘制高级渐变背景（从深橙色到金色）
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#FF6B35');
    bgGradient.addColorStop(0.5, '#F7931E');
    bgGradient.addColorStop(1, '#FDB913');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制白色卡片背景（增加阴影效果）
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, 40, 80, 670, canvasHeight - 200, 28);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // 绘制Logo区域（渐变背景 + 圆角矩形）
    const logoGradient = ctx.createLinearGradient(80, 120, 670, 200);
    logoGradient.addColorStop(0, '#FF6B35');
    logoGradient.addColorStop(1, '#F7931E');
    ctx.fillStyle = logoGradient;
    roundRect(ctx, 80, 120, 590, 100, 16);
    ctx.fill();

    // 加载并绘制小麒麟Logo图片
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
        logoImg.src = '/qilin-logo.jpg';
        setTimeout(resolve, 2000);
      });

      // 绘制Logo图片（左侧）
      const logoSize = 70;
      ctx.save();
      ctx.beginPath();
      ctx.arc(150, 170, logoSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(logoImg, 150 - logoSize / 2, 170 - logoSize / 2, logoSize, logoSize);
      ctx.restore();
    } catch (error) {
      console.error('Logo图片加载失败:', error);
    }

    // 绘制Logo文字（白色 + 阴影）
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 40px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('小麒麟转租通', 230, 180);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.textAlign = 'center';

    // 绘制标题（增加间距）
    ctx.fillStyle = '#1A1A1A';
    ctx.font = 'bold 44px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('房源信息', canvas.width / 2, 270);

    // 绘制装饰性分隔线（渐变色）
    const lineGradient = ctx.createLinearGradient(120, 300, 630, 300);
    lineGradient.addColorStop(0, 'rgba(255, 107, 53, 0)');
    lineGradient.addColorStop(0.5, 'rgba(255, 107, 53, 0.6)');
    lineGradient.addColorStop(1, 'rgba(255, 107, 53, 0)');
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(120, 300);
    ctx.lineTo(630, 300);
    ctx.stroke();

    // 绘制表单内容
    ctx.textAlign = 'left';
    let y = 340;
    const lineHeight = 55;
    const leftMargin = 80;
    const valueMargin = 220;

    const fields = [
      { label: '📍 国家', value: formData.country },
      { label: '🏙️ 城市', value: formData.city },
      { label: '📮 邮编', value: formData.postcode },
      { label: '🏠 地址', value: formData.address },
      { label: '🏢 公寓名称', value: formData.propertyName },
      { label: '🏷️ 公寓类型', value: formData.propertyType },
      { label: '🛏️ 房型', value: formData.roomType },
      { label: '📅 起租日期', value: formData.startDate },
      { label: '📅 结束日期', value: formData.endDate },
      { label: '💰 原价', value: formData.originalPrice ? `${formData.originalPrice}/周` : '' },
      { label: '🔥 现价', value: formData.currentPrice ? `${formData.currentPrice}/周` : '' },
    ];

    fields.forEach(field => {
      if (field.value) {
        ctx.fillStyle = '#666666';
        ctx.font = '26px "PingFang SC", "Microsoft YaHei", sans-serif';
        ctx.fillText(field.label, leftMargin, y);
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 26px "PingFang SC", "Microsoft YaHei", sans-serif';
        
        // 处理长文本
        const maxWidth = 420;
        const text = field.value.toString();
        if (ctx.measureText(text).width > maxWidth) {
          ctx.font = '22px "PingFang SC", "Microsoft YaHei", sans-serif';
        }
        ctx.fillText(text, valueMargin, y);
        y += lineHeight;
      }
    });

    // 绘制设施
    if (formData.facilities && formData.facilities.length > 0) {
      y += 10;
      ctx.fillStyle = '#666666';
      ctx.font = '26px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText('✨ 配套设施', leftMargin, y);
      y += 40;
      ctx.fillStyle = '#E67E22';
      ctx.font = '22px "PingFang SC", "Microsoft YaHei", sans-serif';
      const facilitiesText = formData.facilities.join(' · ');
      wrapText(ctx, facilitiesText, leftMargin, y, 580, 30);
      y += Math.ceil(ctx.measureText(facilitiesText).width / 580) * 30 + 20;
    }

    // 绘制描述
    if (formData.description) {
      y += 20;
      ctx.fillStyle = '#666666';
      ctx.font = '26px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText('📝 房源描述', leftMargin, y);
      y += 40;
      ctx.fillStyle = '#333333';
      ctx.font = '24px "PingFang SC", "Microsoft YaHei", sans-serif';
      y = wrapText(ctx, formData.description, leftMargin, y, 580, 35);
    }

    // 绘制房源照片
    if (hasImages && formData.images.length > 0) {
      y += 30;
      ctx.fillStyle = '#666666';
      ctx.font = '26px "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText('📷 房源照片', leftMargin, y);
      y += 50;

      // 加载并绘制图片（最多6张）
      const imagesToShow = formData.images.slice(0, 6);
      const imageWidth = 280;
      const imageHeight = 200;
      const imageGap = 20;
      const imagesPerRow = 2;

      for (let i = 0; i < imagesToShow.length; i++) {
        const row = Math.floor(i / imagesPerRow);
        const col = i % imagesPerRow;
        const x = leftMargin + col * (imageWidth + imageGap);
        const imageY = y + row * (imageHeight + imageGap);

        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = imagesToShow[i];
            // 超时3秒就跳过
            setTimeout(resolve, 3000);
          });

          // 绘制圆角矩形背景
          ctx.save();
          roundRect(ctx, x, imageY, imageWidth, imageHeight, 12);
          ctx.clip();
          
          // 等比例缩放图片
          const scale = Math.max(imageWidth / img.width, imageHeight / img.height);
          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;
          const offsetX = (imageWidth - scaledWidth) / 2;
          const offsetY = (imageHeight - scaledHeight) / 2;
          
          ctx.drawImage(img, x + offsetX, imageY + offsetY, scaledWidth, scaledHeight);
          ctx.restore();
        } catch (error) {
          console.error('图片加载失败:', imagesToShow[i], error);
          // 绘制占位符
          ctx.fillStyle = '#F5F5F5';
          roundRect(ctx, x, imageY, imageWidth, imageHeight, 12);
          ctx.fill();
          ctx.fillStyle = '#999999';
          ctx.font = '20px "PingFang SC", "Microsoft YaHei", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('图片加载失败', x + imageWidth / 2, imageY + imageHeight / 2);
          ctx.textAlign = 'left';
        }
      }

      y += Math.ceil(imagesToShow.length / imagesPerRow) * (imageHeight + imageGap) + 20;
    }

    // 绘制底部联系信息
    y = canvasHeight - 150;
    
    // 绘制分隔线
    ctx.strokeStyle = '#E5E5E5';
    ctx.beginPath();
    ctx.moveTo(80, y - 30);
    ctx.lineTo(670, y - 30);
    ctx.stroke();

    ctx.fillStyle = '#E67E22';
    ctx.font = 'bold 30px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💬 添加微信客服：qilinboston', canvas.width / 2, y + 20);
    
    ctx.fillStyle = '#999999';
    ctx.font = '22px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('小麒麟转租通 | 专注留学生转租 | 7年专业服务', canvas.width / 2, y + 60);

    // 下载图片
    const link = document.createElement('a');
    link.download = `房源信息_${new Date().getTime()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // 辅助函数：绘制圆角矩形
  function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // 辅助函数：自动换行文本
  function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number {
    const chars = text.split('');
    let line = '';
    let currentY = y;
    
    for (let i = 0; i < chars.length; i++) {
      const testLine = line + chars[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, x, currentY);
        line = chars[i];
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F5A623 0%, #E67E22 100%)' }}>
      {/* 顶部导航栏 - 完全匹配参考图片 */}
      <div 
        className="flex items-center justify-between px-4 py-3"
        style={{ background: 'linear-gradient(90deg, #F5A623 0%, #E67E22 100%)' }}
      >
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="小麒麟转租通" 
            className="w-10 h-10 rounded-full border-2 border-white/30"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-white font-bold text-lg">小麒麟转租通</span>
        </div>
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 border border-white/30 rounded-lg"
          >
            返回修改
          </Button>
        )}
      </div>

      {/* 长图下载按钮 - 放在最上方，醒目位置 */}
      {formData && (
        <div className="px-4 py-4">
          <Button
            onClick={handleDownloadPoster}
            className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold h-14 text-lg shadow-xl rounded-2xl border-2 border-orange-200"
          >
            <Download className="mr-3 h-6 w-6" />
            点击下载房源信息长图
          </Button>
          <p className="text-center text-white/80 text-sm mt-2">保存长图后发送给客服，快速发布您的房源</p>
        </div>
      )}

      {/* 主卡片 - 完全匹配参考图片风格 */}
      <div className="px-4 pb-4">
        <div 
          className="bg-white overflow-hidden"
          style={{ 
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}
        >
          {/* 卡片顶部 - Logo和品牌名 */}
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <img 
              src="/logo.png" 
              alt="小麒麟" 
              className="w-11 h-11 rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div>
              <p className="font-bold text-gray-800 text-sm leading-tight">小麒麟全球转租通 | 全球</p>
              <p className="font-bold text-gray-800 text-sm leading-tight">转租平台</p>
            </div>
          </div>

          {/* 二维码区域 - 使用真实图片 */}
          <div className="flex justify-center px-6 py-2">
            <img 
              src="/wechat-qr.png"
              alt="微信二维码"
              className="w-64 h-64 object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* 二维码下方提示文字 */}
          <p className="text-center text-gray-400 text-sm px-6 mt-2">
            扫一扫上面的二维码图案，加我为朋友。
          </p>

          {/* 扫码添加客服微信 */}
          <h3 className="text-xl font-bold text-center text-gray-900 mt-5 mb-2">
            扫码添加客服微信
          </h3>

          {/* 微信号 */}
          <div className="px-6 pb-6">
            <p className="text-center text-gray-500 text-sm mb-2">微信号：</p>
            <div 
              className="bg-white rounded-xl p-3 flex items-center justify-between"
              style={{ border: '2px solid #FDEBD0' }}
            >
              <p className="text-xl font-bold" style={{ color: '#E67E22' }}>{wechatId}</p>
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 h-8 px-3"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    复制
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    复制
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 工作时间 */}
      <div className="text-center text-white px-4 py-3">
        <p className="text-base mb-1">工作时间：周一至周日 9:00-21:00（美东时间）</p>
        <p className="text-sm opacity-90">我们将在24小时内回复您的咨询</p>
      </div>

      {/* 底部统计 */}
      <div className="flex items-center justify-center gap-16 text-white py-4">
        <div className="text-center">
          <div className="text-5xl font-bold mb-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>7+</div>
          <div className="text-sm opacity-90">年专业经验</div>
        </div>
        <div className="w-px h-14 bg-white/30"></div>
        <div className="text-center">
          <div className="text-5xl font-bold mb-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>98%</div>
          <div className="text-sm opacity-90">客户满意度</div>
        </div>
      </div>

      {/* 品牌故事卡片 */}
      <div className="px-4 pb-4">
        <div className="bg-white/95 rounded-2xl p-5 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">关于我们的故事</h3>
          <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
            <p style={{ color: '#E67E22' }} className="font-medium">这不是一个突然出现的故事。</p>
            <p>
              自2018年起，我们便开始在美国东西海岸的留学生圈子里，默默做着一件简单却重要的小事：
              <span className="font-semibold" style={{ color: '#E67E22' }}>帮助那些因计划突变而不得不提前离开的同学，解决最棘手的转租难题。</span>
            </p>
            <p>
              七年间，我们已成功为<span className="font-semibold" style={{ color: '#E67E22' }}>数千位留学生</span>挽回了因空置房租带来的巨额损失。
              每一个成功转租的背后，都是一个可以安心毕业、无忧奔赴下一段旅程的同学。
            </p>
            <p>
              我们深知，<span className="font-semibold" style={{ color: '#E67E22' }}>您最需要的不是信息堆砌，而是一个确定的结果。</span>
            </p>
          </div>
        </div>
      </div>

      {/* 底部域名 */}
      <div className="text-center pb-6">
        <p className="text-white/70 text-xs">xiaoqilin.homes — 无痕浏览</p>
      </div>
    </div>
  );
}
