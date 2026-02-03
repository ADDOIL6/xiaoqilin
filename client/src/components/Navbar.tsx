import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-xl text-orange-600 hover:opacity-80 transition-opacity">
              <img src="/logo.jpg" alt="小麒麟转租通" className="h-10 w-10 rounded-full object-cover shadow-md" />
              <span>小麒麟转租通</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/listings">
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                转租房源
              </a>
            </Link>
            <Link href="/rental-requests">
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                求租
              </a>
            </Link>
            <Link href="/articles">
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                生活攻略
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
