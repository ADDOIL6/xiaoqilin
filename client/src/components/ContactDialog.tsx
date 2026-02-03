import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export default function ContactDialog({ 
  open, 
  onOpenChange,
  title = "联系我们发布信息",
  description = "添加微信客服，我们将协助您发布房源、求租或二手物品信息"
}: ContactDialogProps) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{title}</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-6">
          {/* 微信图标 */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-3xl shadow-2xl">
              <MessageCircle className="h-16 w-16 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* 微信号 */}
          <div className="w-full space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">微信号</p>
              <div className="bg-muted/50 rounded-xl p-4 border-2 border-dashed border-muted-foreground/20">
                <p className="text-2xl font-bold text-foreground tracking-wider">
                  {wechatId}
                </p>
              </div>
            </div>

            {/* 复制按钮 */}
            <Button 
              onClick={handleCopy}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
              disabled={copied}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  已复制到剪贴板
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-5 w-5" />
                  复制微信号
                </>
              )}
            </Button>
          </div>

          {/* 提示文字 */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              复制微信号后，打开微信添加好友
            </p>
            <p className="text-xs text-muted-foreground">
              我们将在24小时内回复您的咨询
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
