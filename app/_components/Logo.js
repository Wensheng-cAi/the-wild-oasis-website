import Link from "next/link";
import Image from "next/image";
import logo from '@/public/logo.png';

function Logo() {
  return (
    // 只有在跳转到外部🔗时使用a标签（会导致全屏刷新），内部路由优先使用Link
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* 
      Image标签处理了3件事：
      1. 用modern format显示正确的图片大小
      2. prevent layout shift
      3. 自动延迟加载图像，只有图像实际被显示时才会被加载
       */}
      <Image
        src={logo}
        // 使用quality属性来优化图片大小
        quality={100}
        height="60"
        width="60"
        alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
