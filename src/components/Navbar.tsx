'use client';

import { navLinks } from '@/utils/config';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="h-16 bg-zinc-400">
      <div className="container flex h-full items-center">
        <div className="relative mr-12 h-12 w-24 overflow-hidden">
          <Image
            src="/logo.png"
            alt="logo"
            fill
            className="object-fill object-center"
          />
        </div>
        <div className="flex items-center gap-x-4">
          {navLinks.map((nav) => {
            const isActive = nav.href === pathname;
            return (
              <Link
                key={`nav-${nav.name}`}
                href={nav.href}
                className={clsx(
                  'font-semibold',
                  isActive &&
                    'rounded bg-zinc-800 px-2 py-1 !font-bold text-white',
                )}
              >
                {nav.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
